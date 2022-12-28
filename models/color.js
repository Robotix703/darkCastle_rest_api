const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: { type: String, required: true },
  gamme: { type: String, required: true },
  type: { type: String, required: true },
  colorCode: { type: String, required: true },
  drawerName: { type: String, required: true },
  positionX: { type: Number, required: true },
  positionY: { type: Number, required: true },
  toBuy: { type: Boolean, required: false }
});

module.exports = mongoose.model('Color', colorSchema);
