const mongoose = require('mongoose');

const schema = mongoose.Schema;

const songSchema = new schema({
  name: String,
  artist: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
