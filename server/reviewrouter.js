const songController = require('./controllers/songcontroller');

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('landing');
  });

  app.post('/songs', (req, res) => {
    // getting data from form
    let name = req.body.name;
    let author = req.body.author;
    let image = req.body.image;
    let newSong = {name: name, author: author, image: image};
    // writing to database
    // reroute to songs page
    res.redirect('/songreview/songs');
  });

  app.get('/songs/new', (req, res) => {
    res.render('new.ejs')
  });

  app.get('/songs', songController.getAllSongs, (req, res, next) => {

    // res.render('songs', {songs: songs})
  });
}
