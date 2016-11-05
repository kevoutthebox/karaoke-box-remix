const UserSR = require('../models/songreview-usermodel');
const passport = require('passport');

module.exports = {
  registerUser: (req, res, next) => {
    const user = new UserSR({ username: req.body.username });
    UserSR.register(user, req.body.password, (err, savedUser) => {
      if(err) {
        req.flash('error', err.message);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash('success', 'Welcome ' + savedUser.username);
        res.redirect("/songreview/songs");
      });
    });
  },
}
