const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  purchaseDate: {
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

const Purchases = mongoose.model('Purchases', purchaseSchema);

module.exports = Purchases;