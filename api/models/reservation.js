const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    table : { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    waiter : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reference : { type: String, required: true },
    guest : { type: String, required: true },
    createDate : { type: Date, required: true },
    createTime : { type: Timestamp, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema, 'Reservations');