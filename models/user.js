var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true }

},
{
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
