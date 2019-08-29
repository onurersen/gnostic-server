/*
first run this command: 
sudo ifconfig lo0 alias 123.123.123.123/24
*/
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://123.123.123.123/notes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var notes = require('./routes/note.js')(app);

var server = app.listen(3001, function () {
    console.log('Server running at http://127.0.0.1:3001/');
});
