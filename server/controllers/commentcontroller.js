const Song = require('../models/songmodel');
const Comment = require('../models/commentmodel');

module.exports = {
  // find song in DB
  serveNewCommentForm: (req, res) => {
    //find song in db then serve comment form
    Song.findById(req.params.id, (err, song) => {
      if (err) {
        console.log(err);
      } else {
        res.render('comments/new', { song: song });
      }
    });
  },
  addNewComment: (req, res) => {
    //find song in db then add comment to it
    Song.findById(req.params.id, (err, song) => {
      if (err) {
        console.log(err);
        res.redirect('/songreview/songs')
      } else {
        Comment.create(req.body.comment, (err, comment) => {
          if (err){
            console.log(err)
          } else {
            //add username and id to comment
            req.user
            //save comment to db
            song.comments.push(comment);
            song.save();
            res.redirect('/songreview/songs/' + song._id);
          }
        })
      }
    });
  },
};
