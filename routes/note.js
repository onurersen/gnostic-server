const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');
const verifyToken = require('../security/token');
const { noteValidation } = require('../validator/note');

// save note
router.post('/save', verifyToken , async (req, res) => {

    const {error} = noteValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if note exists
    const noteExist = await Note.findOne({
        $or: [{
            description: req.body.description
        }, {
            topic: req.body.topic
        }]
    });
    if(noteExist) return res.status(400).send('Note already exists');

    const note = new Note({
        topic: req.body.topic,
        description: req.body.description,
        tags: req.body.tags
    });

    try {
        const savedNote = await note.save();
        res.send({note: note._id});
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;
