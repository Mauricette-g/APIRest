const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  catwayNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Catway'},
  clientName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkIn: { type: Date, required: false },
  checkOut: { type: Date, required: false }
});

module.exports = mongoose.model('Reservation', reservationSchema);

