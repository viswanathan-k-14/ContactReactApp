const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../modals/User');
const Contact = require('../modals/Contact');
const router = express.Router();

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  '/',
  [auth, check('name', 'Please enter a valid name!').not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      let newContact;

      newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contacts = await newContact.save();
      res.json(contacts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res, next) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact Not Found!');
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send('Unauthorized Access!');
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact Not Found!');
    }
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send('Unauthorized Access!');
    }
    contact = await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;
