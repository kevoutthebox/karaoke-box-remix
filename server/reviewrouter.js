const songController = require('./controllers/songcontroller');
const commentController = require('./controllers/commentcontroller');
const passportService = require('./services/passport');
const userSRController = require('./controllers/songreview-authcontroller');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

// middleware to protect routes

function protectedRoute(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/songreview/login');
}

module.exports = function (app) {
  app.use('*', (req, res,next) => {
    next()
  });

  app.get('/', (req, res) => {
    res.render('landing');
  });

  app.get('/songs/new', (req, res) => {
    res.render('songs/new.ejs');
  });

  app.get('/songs', songController.getAllSongs);

  app.get('/songs/:id', songController.getSongDetail);

  app.post('/songs', songController.addNewSong);

// ===========
// ROUTES FOR comments
// ===========

  app.get('/songs/:id/comments/new', protectedRoute, commentController.serveNewCommentForm);

  app.post('/songs/:id/comments', protectedRoute, commentController.addNewComment);

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
    res.render('login');
  });

  app.post('/login', passport.authenticate('local',
    {
      successRedirect: '/songreview/songs',
      failureRedirect: '/songreview/login',
    }));

  //logout routes
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/songreview/songs')
  });
}
