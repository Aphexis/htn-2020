const passport = require('passport');
const models = require('../models');

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findOne({id: id})
    .then((user) => { done(null, user); })
    .catch((err) => { done(err,null); });
  });

};
