const mongoose = require('mongoose');

const db = 'mongodb+srv://superlistabd:superlistabd@cluster0.fkpomca.mongodb.net/?retryWrites=true&w=majority';

const connection = mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;