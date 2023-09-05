var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const customerModel = require('../models/customers.model');

/* GET all customers listing. */
router.post('/add', async function(req, res, next) {
  try {
    const customerObj = new customerModel({
      firstName: 'Dikshant',
      lastName: 'Vats',
      emailAddress: 'vats.dikk@gmail.com',
      phoneNumber: '9873380339',
      dob: '01-01-1000'
    });

    await customerObj.save(); // Using await to wait for the save operation to complete

    res.status(200).json({ status: 200, message: "Added customer successfully" });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ status: 500, message: "Unable to add customer" });
  }
});
/* update existing customer */
router.put('/update', function(req, res, next) {
  res.send('respond with a resource');
});

/* delete existing customer */
router.delete('/delete', function(req, res, next) {
  res.send('respond with a resource');
});


/* search existing customer */
router.get('/search', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
