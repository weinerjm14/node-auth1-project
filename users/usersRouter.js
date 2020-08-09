const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./user-models');
const restrict = require('../restrict');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const router = express.Router();

router.get('/users', restrict(), async (req, res, next) => {
  try {
    console.log('get users request', req.headers);
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: 'Username is already taken',
      });
    }

    const newUser = await Users.add({
      username,
      // hash the password with a time complexity of "14"
      password: await bcrypt.hash(password, 14),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: 'You shall not pass!',
      });
    }

    // hash the password again and see if it matches what we have in the database
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: 'You shall not pass!',
      });
    }

    // generate a new session for this user,
    // and sends back a session ID
    req.session.user = user;
    const token = generateToken(user);

    res.json({
      message: `Welcome ${user.username}!`,
      token,
    });
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

router.get('/logout', async (req, res, next) => {
  try {
    req.session.destroy(err => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
