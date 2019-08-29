var mongoose = require('mongoose');

const noteSchema = mongoose.Schema({

    topic: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: {
        type: String,
        required: true,
        validate: v => v == null || v.length > 0
    }
    
},
{
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
