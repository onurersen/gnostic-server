const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { userLoginValidation } = require('../../validator/user');

router.post('/login', async (req,res) => {

    const {error} = userLoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Login failed. Email or password incorrect.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Login failed. Email or password incorrect.');

    const token = jwt.sign({_id: user._id, expiresIn: '1d'}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;