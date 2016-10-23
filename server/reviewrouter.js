const songController = require('./controllers/songcontroller');

module.exports = function (app) {
  app.get('/', (req, res) => {
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

  // app.get("songs/:id/comments/new", (req, res) => {
  //   res.render("comments/new");
  // })

}
