const mongoose = require('mongoose');

const schema = mongoose.Schema;

const songSchema = new schema({
  name: String,
  author: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
