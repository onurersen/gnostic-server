const mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
 
    topic: { 
        type: String, 
        required: true, 
        trim: true,
        min: 2,
        max: 255
    },
    description: { 
        type: String, 
        required: true, 
        trim: true,
        min: 2,
        max: 255
    },
    tags: {
        type: Array,
        required: true,
        validate: v => v == null || v.length > 0
    }

},
{
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
