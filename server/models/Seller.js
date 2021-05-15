const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

const sellerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  sales: [Order.schema],
  purchases: [Order.schema],
  seeds: {
    type: Number
  }
});

// set up pre-save middleware to create password
sellerSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
sellerSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;