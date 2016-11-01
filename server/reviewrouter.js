const songController = require('./controllers/songcontroller');
const commentController = require('./controllers/commentcontroller');
const passportService = require('./services/passport');
const userSRController = require('./controllers/songreview-authcontroller');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const requireAuth = passport.authenticate('jwt', { session: false });

// middleware to protect routes

function protectedRoute(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'this route requires logging in');
  res.redirect('/songreview/login');
}

module.exports = function (app) {
  app.use('*', (req, res, next) => {
    next()
  });

  //use this for put and delete api endpoints
  app.use(methodOverride('_method'));
  //use this for flash messages
  app.use(flash());

  //middleware to have user data throughout routes
  app.use((req, res, next) => {
    res.locals.loggedinUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
  });

  //landing route
  app.get('/', (req, res) => {
    res.render('landing');
  });

  //routes for songs
  app.get('/songs/new', protectedRoute, (req, res) => {
    res.render('songs/new.ejs');
  });

  app.get('/songs', songController.getAllSongs);

  app.get('/songs/:id', songController.getSongDetail);

  app.post('/songs', songController.addNewSong);

  //routes for edits and update
  app.get('/songs/:id/edit', songController.checkSongOwner, songController.serveEditPage);

  app.put('/songs/:id', songController.updateSong);

  //routes for delete
  app.delete('/songs/:id', songController.checkSongOwner, songController.deleteSong);

// ===========
// ROUTES FOR comments
// ===========

  app.get('/songs/:id/comments/new', protectedRoute, commentController.serveNewCommentForm);

  app.post('/songs/:id/comments', protectedRoute, commentController.addNewComment);

  app.get('/songs/:id/comments/:comment_id/edit', commentController.checkCommentOwner, commentController.serveEditPage);

  app.put('/songs/:id/comments/:comment_id', commentController.checkCommentOwner, commentController.updateComment);

  app.delete('songs/:id/comments/:comment_id', commentController.checkCommentOwner, commentController.deleteComment);

// ==========
// ROUTES FOR AUTH
// ==========

  //register routes
  app.get('/register', (req, res) => {
    res.render('register');
  });

  app.post('/register', userSRController.registerUser);

  //login routes
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
  });

  app.post('/login', passport.authenticate('local',
    {
      successRedirect: '/songreview/songs',
      failureRedirect: '/songreview/login',
    }));

  //logout routes
  app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out')
    res.redirect('/songreview/songs')
  });
}
