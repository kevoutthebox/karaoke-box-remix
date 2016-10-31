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
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            //save comment to db
            song.comments.push(comment);
            song.save();
            res.redirect('/songreview/songs/' + song._id);
          }
        })
      }
    });
  },
  serveEditPage: (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        console.log('found', foundComment)
        res.render("comments/edit", { song_id: req.params.id, comment: foundComment });
      }
    })
  },
  updateComment: (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
      if (err) {
        res.redirect('back');
      } else {
        res.redirect(`/songreview/songs/${req.params.id}`);
      }
    })
  },
  deleteComment: (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
      if(err) {
        res.redirect('back');
      } else {
        res.redirect('/songreview/songs/req.params.id');
      }
    })
  },
  checkCommentOwner: (req, res, next) => {
    //check if user is logged in
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          res.redirect("back");
        } else {
          //does user own song
          if(foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
  },
};
