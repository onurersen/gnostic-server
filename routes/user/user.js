const router = require('express').Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const verifyToken = require('../../security/token');
const User = require('../../models/User');
const { userRegisterValidation } = require('../../validator/user');
const { userUpdateValidation } = require('../../validator/user');
const { userFindValidation } = require('../../validator/user');

router.post('/register', async (req, res) => {

    const {error} = userRegisterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/update', verifyToken , async (req, res) => {

    const {error} = userUpdateValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userExist = await User.findOne({_id: req.body._id});
    if(!userExist) return res.status(400).send('User does not exist');

    var updateUserModel = new User(req.body);
    var updateUser= updateUserModel.toObject();
    delete updateUser._id; 

    var userId;
    if (req.body._id || req.body._id !== '') {
        userId = new mongoose.mongo.ObjectId(req.body._id);
    } else {
        userId = new mongoose.mongo.ObjectId();
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    updateUser.password = hashPassword;

    try {
        const updatedUser = await User.updateOne({_id: userId}, updateUser, {upsert: true},
            function (err) {
                if (err) throw err;
            }
        );
        res.send({user: userId});
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/find', verifyToken , async (req, res) => {

    const {error} = userFindValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const userExist = await User.find({ "email": req.body.email});
    if(!userExist) return res.status(400).send('User does not exist');

    try {
        res.send(userExist);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/delete', verifyToken , async (req, res) => {

    const {error} = userDeleteValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const userExist = await User.findOne({_id: req.body._id});
    if(!userExist) return res.status(400).send('User does not exist');

    try {
        const deletedUser = await User.deleteOne({_id: userExist._id});
        res.send({user: req.body._id});
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;
