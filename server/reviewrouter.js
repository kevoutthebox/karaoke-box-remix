const songController = require('./controllers/songcontroller');
const commentController = require('./controllers/commentcontroller');
const passportService = require('./services/passport');
const userSRController = require('./controllers/songreview-authcontroller');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.use('*', (req, res,next) => {
    console.log('auth',req.body)
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

  app.get('/songs/:id/comments/new', requireAuth, commentController.serveNewCommentForm);

  app.post('/songs/:id/comments', commentController.addNewComment);

// ==========
// ROUTES FOR AUTH
// ==========
  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", userSRController.registerUser, (req, res) => {

  });
}
