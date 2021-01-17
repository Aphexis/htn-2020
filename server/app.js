require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var axios = require('axios');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var Nexmo = require('nexmo');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var authHelpers = require('./auth/_helpers');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var friendsRouter = require('./routes/friends');
var tasksRouter = require('./routes/tasks');
const models = require('./models');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');

var app = express();

console.log(process.env.SECRET_KEY)

// vonage setup
const nexmo = new Nexmo({
  apiKey: '87bf5295',
  apiSecret: 'i0oeJccEnznHhBfW',
  applicationId: '01347063-6248-42b3-bf3a-371d66947d3b',
  privateKey: './secret/private.key',
});

const from = '16137679934';
const to = '16476390488';
var text_ctr = 0;
var call_ctr = 0;
var request_id = "";
var num_pics = -1;


// Serve static files from the React app first
app.use(express.static(path.join(__dirname, '../client/build')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors())

// API endpoints
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/tasks', tasksRouter);

app.get('/auth', (req, res, next) => { // test endpoint
  if (req.user) {
    console.log(models.userToJSON(req.user));
    res.status(200).json(models.userToJSON(user));
  } else {
    console.log('not logged in');
    res.status(400).json('not logged in');
  }
})

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findOne({id: id})
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy((username, password, done) => {
  // check to see if the username exists
  models.User.findOne({where: {username: username}})
  .then((user) => {
    if (!user) {
      console.log('not logged in, wrong user');
      return done(null, false);
    } else if (!authHelpers.comparePass(password, user.password)) {
      console.log('not logged in, wrong pw');
      return done(null, false);      
    } else {
      console.log('logged in w auth');
      return done(null, user);
    }
  })
  .catch((err) => { return done(err); });
}));

app.post('/auth/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
    // res.status(200).json(models.userToJSON(user));
  });

app.post('/auth/register', async (req, res, next)  => {
  try {
    // TO-DO: check if user already exists
    // console.log('hi');
    const password = authHelpers.getHashedPassword(req.body.password.toString());
    // console.log(2);
    const user = await models.User.create({
        username: req.body.username,
        password: password,
        phone: req.body.phone,
    });
    console.log(models.userToJSON(user));
    res.status(200).json(models.userToJSON(user));
    // passport.authenticate('local', (err, user, info) => {
    //   if (user) { res.status(200).json(models.userToJSON(user)); }
    // })(req, res, next);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
});

// Test API endpoint
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

// upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'images')
},
filename: function (req, file, cb) {
  num_pics += 1;
  cb(null, `pic${num_pics}.png`);
}
})
var upload = multer({ storage: storage }).single('file')
app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});

// sends a text
app.post('/api/sendText', (req, res) => {
  console.log(req.body)
  text_ctr += 1;
  const text = `#${text_ctr}: ${req.body["message"]}`;
  console.log(text)
  nexmo.message.sendSms(from, to, text);
  res.json("text");
  console.log("sent text");
  res.status(200).end();
})

app.post('/api/makeCall', (req, res) => {
  console.log(req.body["message"]);
  res.json("vc")
  call_ctr += 1;
  var ncco = [
    {
      action: 'talk',
      voiceName: 'Brian',
      text: req.body["message"] + ` this is call number ${call_ctr}`,
    },
  ];

  nexmo.calls.create(
    {
      to: [{ type: 'phone', number: to }],
      from: { type: 'phone', number: from },
      ncco,
    },
    (err, result) => {
      console.log(err || result);
    },
  );
  
  console.log("made call");
})

app.get('/api/verify/request', (req, res) => {
  console.log("modal opened!");
  nexmo.verify.request({
    number: to,
    brand: "me"
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const verifyRequestId = result.request_id;
      request_id = verifyRequestId;
    }
  });
  res.status(200).end();
})

app.post('/api/verify/check', (req, res) => {
  nexmo.verify.check({
    request_id: request_id,
    code: req.body["pin"]
  }, (err, result) => {
    if (err) {
      console.log("error:");
      console.log(err)
    } else {
      console.log(result);
      if (result.error_text) {
        // console.log(result.error_text);
        
        res.send(false);
      } else {
        // console.log("Successfully verified.");
        res.send(true);
      }
    }
  });
})

//Messages Api
app.post('/answer', function(req, res) {
  var from_id = req.body.from.id;

  axios.post('https://messages-sandbox.nexmo.com/v0.1/messages',
  {
      "from": { "type": "messenger", "id": "107083064136738" },
      "to": { "type": "messenger", "id": from_id },
      "message": {
          "content": {
              "type": "image",
              "image": {
                  "url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg"
              }
          }
      }
  },
  {
      auth: {
          username:'87bf5295',
          password:'i0oeJccEnznHhBfW'
      }
  }).then(response => {
      //console.dir(response);
  }).catch(error => {
      console.error(error);
  });
  res.status(204).end();
});

app.post('/event', function(req, res) {
  res.status(204).end();
});

// Return any remaining requests to the React app to handle routing
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3002);

module.exports = app;
