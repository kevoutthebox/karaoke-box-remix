const Song = require('../models/songmodel');

module.exports = {
  getAllSongs: (req, res, next) => {
    // Song.create({name: 'Together', author: 'Taylor Swift', image: 'https://upload.wikimedia.org/wikipedia/en/4/40/We_Are_Never_Ever_Getting_Back_Together.png',})
    // Song.create({name: 'Closer', author: 'Chainsmokers', image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png',})

    Song.find({}, (err, allSongs) => {
      if (err) console.log(err);
      else {
        res.render('songs', { allSongs: allSongs });
      }
    });
  },
  addNewSong: (req, res, next) => {
    // Use data from form and save the document to DB
    let name = req.body.name;
    let author = req.body.author;
    let image = req.body.image;
    let description = req.body.description;
    let newSong = new Song({
      name: name,
      author: author,
      image: image,
      description: description,
    });
    console.log(newSong)
    newSong.save((err) => {
      if (err) { res.send('error' + err); }
      // redirect to all songs page
      res.redirect('/songreview/songs');
    });
  },
  getSongDetail: (req, res, next) => {
    // query from song collection for particular id
    Song.findById(req.params.id, (err, foundSong) => {
      if (err) {
        console.log(err)
      } else {
        // render song detail with that song
        res.render('songdetail', { song: foundSong });
      }
    });
  },
}
