var _ = require('lodash');
var User = require('../models/user.js');

module.exports = function(app) {

    /* Create */
    app.post('/user', function (req, res) {
        var newUser = new User(req.body);
        newUser.save(function(err) {
            if (err) {
                res.json({info: 'error during user create', error: err});
            };
            res.json({info: 'user created successfully'});
        });
    });

    /* Read */
    app.get('/user', function (req, res) {
        User.find(function(err, users) {
            if (err) {
                res.json({info: 'error during finding user', error: err});
            };
            res.json({info: 'user found successfully', data: users});
        });
    });

    app.get('/user/:id', function (req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.json({info: 'error during finding user', error: err});
            };
            if (user) {
                // res.json({info: 'user found successfully', data: user});
                setTimeout(function(){
                    res.json({info: 'user found successfully', data: user});
                }, 10000);
            } else {
                res.json({info: 'user not found'});
            }
        });
    });

    /* Update */
    app.put('/user/:id', function (req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.json({info: 'error during finding user', error: err});
            };
            if (user) {
                _.merge(user, req.body);
                user.save(function(err) {
                    if (err) {
                        res.json({info: 'error during updating user', error: err});
                    };
                    res.json({info: 'user updated successfully'});
                });
            } else {
                res.json({info: 'user not found'});
            }

        });
    });

    /* Delete */
    app.delete('/user/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during removing user', error: err});
            };
            res.json({info: 'user removed successfully'});
        });
    });


};
