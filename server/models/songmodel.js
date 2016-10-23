const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const songSchema = new Schema({
  name: String,
  author: String,
  image: String,
  description: String,
});

const Song = Mongoose.model('Song', songSchema);

module.exports = Song;
