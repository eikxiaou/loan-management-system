var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const customerModel = require('../models/customers.model');


//List all customers
router.get('/list', async function(req, res, next) {
  try {
    const customerListResponse = await customerModel.find(); // Use await to wait for the find operation to complete
    const recordCount = customerListResponse.length;

    res.status(200).json({
      status: 200,
      message: "All Customers fetched successfully",
      recordCount: recordCount,
      results: customerListResponse
    });

  } catch (error) {
    console.error('Error getting customer:', error);
    res.status(500).json({ status: 500, message: "Unable to get customers" });
  }
});

//Get details of a specific customer
router.get('/view', async function(req, res, next) {
  try {
    const userId = req.query.userId;
    const customerListResponse = await customerModel.findById(userId); // Use await to wait for the find operation to complete
    const recordCount = customerListResponse.length;

    res.status(200).json({
      status: 200,
      message: "Customer fetched successfully",
      recordCount: recordCount,
      results: customerListResponse
    });

  } catch (error) {
    console.error('Unable to find customer:', error);
    res.status(500).json({ status: 500, message: "Unable to find customer" });
  }
});

/* insert new customer listing. */
router.post('/add', async function(req, res, next) {
  try {
    const customerObj = new customerModel({
      firstName: 'user2',
      lastName: 'lastname2',
      emailAddress: 'abc@gmail.com',
      phoneNumber: '234354',
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
router.put('/update', async function(req, res, next) {
  try {
    const userId = req.query.userId;
    const customerObj = {
      firstName: 'user3',
      lastName: 'lastname3',
      emailAddress: 'fdfsf@gmail.com',
      phoneNumber: '45435',
      dob: '01-01-1000'
    };
    await customerModel.findByIdAndUpdate(userId, customerObj); // Using await to wait for the update operation to complete

    res.status(200).json({ status: 200, message: "Updated customer successfully" });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ status: 500, message: "Unable to update customer" });
  }
});

/* delete existing customer */
router.delete('/delete',async function(req, res, next) {
  try {
    const userId = req.query.userId;

    await customerModel.findByIdAndDelete(userId); // Using await to wait for the update operation to complete

    res.status(200).json({ status: 200, message: "Deleted customer successfully" });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ status: 500, message: "Unable to Delete customer" });
  }
});


/* search existing customer */
router.get('/search', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
