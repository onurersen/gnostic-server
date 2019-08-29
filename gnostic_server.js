var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var noteRoutes = require('./routes/note.js')(app);

var server = app.listen(3000, function () {
    console.log('Note server running at http://127.0.0.1:3000/');
});
