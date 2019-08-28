var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({

    topic: String,
    description: String,
    tags: [String]

});

module.exports = mongoose.model('Note', noteSchema);
