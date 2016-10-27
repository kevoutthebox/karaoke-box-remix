const songController = require('./controllers/songcontroller');
const commentController = require('./controllers/commentcontroller');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/', (req, res) => {
    console.log(req.headers)
    res.render('landing');
  });

  app.get('/songs/new', (req, res) => {
    res.render('new.ejs');
  });

  app.get('/songs', songController.getAllSongs);

  app.get('/songs/:id', songController.getSongDetail);

  app.post('/songs', songController.addNewSong);

// ===========
// ROUTES FOR comments
// ===========

  app.get('/songs/:id/comments/new', requireAuth, commentController.serveNewCommentForm);

  app.post('/songs/:id/comments', commentController.addNewComment);
}
