const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', (req, res, next) => {
  res.send('Get auth user !');
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post('/', (req, res, next) => {
  res.send('Post user to auth !');
});

module.exports = router;
