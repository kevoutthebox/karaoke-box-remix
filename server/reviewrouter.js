


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

  app.get('/songs', (req, res, next) => {
    let songs = [
      {name: 'Together', author: 'Taylor Swift', image: 'https://upload.wikimedia.org/wikipedia/en/4/40/We_Are_Never_Ever_Getting_Back_Together.png',},
      {name: 'Closer', author: 'Chainsmokers', image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png',},
    ];
    res.render('songs', {songs: songs})
  });
}
