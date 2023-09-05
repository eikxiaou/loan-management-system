var express = require('express');
var router = express.Router();
router.use(express.json());

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
    console.log(req.body)
    const firstName = req.body.firstName;
    const  lastName= req.body.lastName  
    const  emailAddress= req.body.emailAddress;  
    const  phoneNumber= req.body.phoneNumber  
    const  dob= req.body.dob   

    const customerObj = new customerModel({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      dob: dob 
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
    const userId = req.body.userId;

    // Create an update object without _id
    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      phoneNumber: req.body.phoneNumber,
      dob: req.body.dob 
    };

    // Exclude the _id field from the update object
    delete updateFields._id;

    // Use the { new: true } option to return the updated document
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      userId,          // Find by _id
      updateFields,    // Fields to update
      { new: true }    // Return the updated document
    );

    if (!updatedCustomer) {
      return res.status(404).json({ status: 404, message: "Customer not found" });
    }

    res.status(200).json({ status: 200, message: "Updated customer successfully", updatedCustomer });
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
