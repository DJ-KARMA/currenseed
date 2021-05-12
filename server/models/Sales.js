const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleSchema = new Schema({
  saleDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Sales = mongoose.model('Sales', saleSchema);

module.exports = Sales;