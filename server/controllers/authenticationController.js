const jwt = require('jwt-simple');
const User = require('../models/userModel');
const path = require('path');
const fs = require('fs');

function createJwt(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf8')).jwtSecret);
}

module.exports = {
  signup: (req, res, next) => {

    //Pull email and password out of request body
    const { email, password } = req.body;

    //If user doesn't input both email and password, return an error
    if (!email || !password) {

      return res.status(422).send({ error: 'Missing Email or Password' });
    }

    //check if input username already exists in the DB
    User.findOne({ email: email }, (err, foundInDB) => {

      if (err) { return next(err); }

      // If email is in DB, return an error
      if (foundInDB) {
        return res.status(422).send({ error: 'Sorry email is already in use' });
      }

      // If the email address isn't found in the DB, save the new user
      const user = new User({
        email: email,
        password: password,
      });

      user.save((err, data) => {

        if (err) { return next(err); }

        // Respond with a JWT after user signs up

        res.json({ token: createJwt(user) });
      });
    });
  },
  login: (req, res, next) => {

    //the middleware after we authenticate user, so just respond with a token
    res.send({ token: createJwt(req.user) });
  },
};
