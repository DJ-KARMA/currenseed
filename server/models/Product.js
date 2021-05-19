const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default: "https://images.heb.com/is/image/HEBGrocery/000375146-1?$article%2D235%2Dsquare$"
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  sellerId: {
    type: String
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;