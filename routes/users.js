const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../modals/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  '/',
  [
    check('name', 'Please enter a valid name!').not().isEmpty(),
    check('email', 'Please enter a valid email address!').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters!'
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'user already exists!' });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

module.exports = router;
