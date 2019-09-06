const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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

// save note
router.post('/update', verifyToken , async (req, res) => {

    const {error} = noteValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const noteExist = await Note.findOne({_id: req.body._id});
    if(!noteExist) return res.status(400).send('Note does not exist');

    var updateNoteModel = new Note(req.body);
    var updateNote= updateNoteModel.toObject();
    delete updateNote._id; 

    var noteId;
    if (req.body._id || req.body._id !== '') {
        noteId = new mongoose.mongo.ObjectId(req.body._id);
    } else {
        noteId = new mongoose.mongo.ObjectId();
    }

    try {
        const updatedNote = await Note.updateOne({_id: noteId}, updateNote, {upsert: true},
            function (err) {
                if (err) throw err;
            }
        );
        res.send({note: noteId});
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;
