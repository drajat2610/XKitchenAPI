const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    table : { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reference : { type: String, required: false },
    guest : { type: String, required: true },
    createDate : { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');