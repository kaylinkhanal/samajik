const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  dateOfBirth: { type: Date },

  password: { type: String, required: true },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }],
  phoneNumber: { type: String },
  avatar: { type: String },
  skills: [{ type: String }],  
  relationshipStatus: {
    type: String,
    enum: ['Single', 'In a relationship', 'Married', 'Complicated'],
    default: 'Single'
  },
  birthday: { type: Date },  
  anniversary: { type: Date }, 
  jobTitle: { type: String },  
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String }
  },
  website: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);


 module.exports  = User




 


