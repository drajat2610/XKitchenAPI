const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    reservation : { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status : { type: Number, required: true, trim: true, default: 0 },
    quantity : { type: Number, required: true, trim: true, default: 1 },
    created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Order', orderSchema, 'orders');