const express = require('express');
const router = express.Router();

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post('/', (req, res, next) => {
  res.send('User registered !');
});

module.exports = router;
