const mongoose = require('mongoose');

const ListaDataSchema = new mongoose.Schema({
    title: String,
    notes: String,
    priority: Boolean,
});

module.exports = mongoose.model('SuperLista', ListaDataSchema);
