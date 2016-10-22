const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const songSchema = new Schema({
  name: String,
  author: String,
  image: String,
});

const Song = Mongoose.model('Song', songSchema);

// Song.create({name: 'Together', author: 'Taylor Swift', image: 'https://upload.wikimedia.org/wikipedia/en/4/40/We_Are_Never_Ever_Getting_Back_Together.png',})
// Song.create({name: 'Closer', author: 'Chainsmokers', image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png',})


module.exports = Song;
