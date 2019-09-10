const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');

// import Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/login');
const noteRoute = require('./routes/note'); 

// read config from .env file
dotenv.config();

// initialize bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connect DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => console.log('connected to db!'));

// middleware
app.use(express.json());

// route middlewares
app.use('/api/login', authRoute);
app.use('/api/user', userRoute);
app.use('/api/note', noteRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var server = app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
});
