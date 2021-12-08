const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


const { models } = require('../models')
const accountAdmin = models.admins

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  async function (username, password, done) {
    const user = await accountAdmin.findOne({ where: { email: username }, raw: true });
    
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!(user.password === password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user)
  },
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = passport;