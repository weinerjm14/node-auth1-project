const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

function restrict() {
  const authError = {
    message: 'You shall not pass!',
  };

  return async (req, res, next) => {
    const token = req.header('authorization') || req.cookies.token;
    try {
      if (!token) {
        return res.status(401).json(authError);
      }

      // if we reach this point, the user is considered authorized!
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
