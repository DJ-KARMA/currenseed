const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleSchema = new Schema({
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

const Sales = mongoose.model('Sales', saleSchema);

module.exports = Sales;