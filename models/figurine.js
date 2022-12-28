const mongoose = require('mongoose');

const figurineSchema = mongoose.Schema({
    name: { type: String, required: true},
    categorie: { type: String, required: true },
    imagePath: { type: String, required: true},
    favoris: { type: [String] },
    painted: { type: Boolean }
});

module.exports = mongoose.model('Figurine', figurineSchema);
