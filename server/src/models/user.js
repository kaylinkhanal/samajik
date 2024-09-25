const mongoose = require("mongoose");

const User = mongoose.model('User', {
    fullName: String,
    email: String,
    gender: {
      type: String,
      enum : ['Male', 'Female', 'Other'],
      default: 'Male'
    },
    dateOfBirth: String,
    password: String,
    phoneNumber: String
 });


 module.exports  = User