const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//configure session false since we're not using cookies
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local')

module.exports = function(app) {
  app.post('/api/login', requireSignin, Authentication.login);
  app.post('/api/signup', Authentication.signup);

};
