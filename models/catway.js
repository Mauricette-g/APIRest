//const { required } = require('joi');
const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  catwayState: { type: Boolean, default : true, required: true },
  boatName: { type: String, required: false },
  
});

module.exports = mongoose.model('Catway', catwaySchema);