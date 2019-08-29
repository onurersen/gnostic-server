var _ = require('lodash');
var Note = require('../models/note.js');

module.exports = function(app) {

    /* Create */
    app.post('/note', function (req, res) {
        var newNote = new Note(req.body);
        newNote.save(function(err) {
            if (err) {
                res.json({info: 'error during note create', error: err});
            };
            res.json({info: 'note created successfully'});
        });
    });

    /* Read */
    app.get('/note', function (req, res) {
        Note.find(function(err, notes) {
            if (err) {
                res.json({info: 'error during finding notes', error: err});
            };
            res.json({info: 'notes found successfully', data: notes});
        });
    });

    app.get('/note/:id', function (req, res) {
        Note.findById(req.params.id, function(err, note) {
            if (err) {
                res.json({info: 'error during finding note', error: err});
            };
            if (note) {
                // res.json({info: 'note found successfully', data: note});
                setTimeout(function(){
                    res.json({info: 'note found successfully', data: note});
                }, 10000);
            } else {
                res.json({info: 'note not found'});
            }
        });
    });

    /* Update */
    app.put('/note/:id', function (req, res) {
        Note.findById(req.params.id, function(err, note) {
            if (err) {
                res.json({info: 'error during finding note', error: err});
            };
            if (note) {
                _.merge(note, req.body);
                note.save(function(err) {
                    if (err) {
                        res.json({info: 'error during updating note', error: err});
                    };
                    res.json({info: 'note updated successfully'});
                });
            } else {
                res.json({info: 'note not found'});
            }

        });
    });

    /* Delete */
    app.delete('/note/:id', function (req, res) {
        Note.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during removing note', error: err});
            };
            res.json({info: 'note removed successfully'});
        });
    });


};
