const mongoose = require('mongoose');

const drawerSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  emptySlot: { type: [Number], required: false },
  isFull: { type: Boolean, required: false }
});

module.exports = mongoose.model('Drawer', drawerSchema);