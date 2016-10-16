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

  // generate a salt, then in the callback hash the password
});

// Defining the model class, the user collection
const User = mongoose.model('user', userSchema);

// Exporting the model to use in controllers

module.exports = User;
