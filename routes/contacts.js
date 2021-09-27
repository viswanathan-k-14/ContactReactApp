const express = require('express');
const router = express.Router();

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', (req, res, next) => {
  res.send('contacts fetched !');
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post('/', (req, res, next) => {
  res.send('contacts created !');
});

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', (req, res, next) => {
  res.send('contacts updated !');
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', (req, res, next) => {
  res.send('contacts deleted!');
});

module.exports = router;
