const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loginValidation } = require('../validator/login');

// login user
router.post('/login', async (req,res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // check user existence
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Login failed. Email or password incorrect.');

    // authentication info is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Login failed. Email or password incorrect.');

    // create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;