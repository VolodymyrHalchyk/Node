const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  model: { type: String, required: true },
  power: { type: Number, required: true },
  color: { type: String, required: true }
});

module.exports = model('Car', carSchema);
