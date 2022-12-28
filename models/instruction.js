const mongoose = require('mongoose');

const instructionSchema = mongoose.Schema({
  figurineID: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  paintID: { type: [String], required: true },
  step: { type: Number, required: true }
});

module.exports = mongoose.model('Instruction', instructionSchema);
