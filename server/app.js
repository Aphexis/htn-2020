var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Nexmo = require('nexmo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// vonage setup
const nexmo = new Nexmo({
  apiKey: '6c1ba49d',
  apiSecret: 'Mx95yDBEjmXAFxn8',
  applicationId: 'ebff6c77-40c2-4357-b46b-7af62d1bf1cd',
  privateKey: './secret/private.key',
});

const from = '15877603707';
const to = '14167799080';
var text_ctr = 0;
var call_ctr = 0;
var request_id = "";

// Serve static files from the React app first
app.use(express.static(path.join(__dirname, '../client/build')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API endpoints
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Test API endpoint
app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
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

module.exports = app;
