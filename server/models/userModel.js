const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrpyt = require('bcrypt-nodejs');

// Defining the User model
const userSchema = new Schema({
  email: { type: String, lowercase: true, unique: true },
  password: String,
});

// Before saving a password to the DB, we write a hook to encrypt it
userSchema.pre('save', (next) => {
  // specifiying a user model
  const user = this;

  // generate a salt, then in the callback hash the password w/bcrpyt
  bcrpyt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrpyt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // replace password with hashed version then call next
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function(inputPass, callback) {
  bcrpyt.compare(inputPass, this.password, (err, isMatch) => {
    // After hasing user input pass, if doesn't match, call callback with error
    if (err) { return callback(err); }

    // If passwords match, call callback with isMatch = true
    callback(null, isMatch);
  });
}

// Defining the model class, the user collection
const User = mongoose.model('user', userSchema);

// Exporting the model to use in controllers

module.exports = User;
