const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema({

  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

const Purchases = mongoose.model('Purchases', purchaseSchema);

module.exports = Purchases;