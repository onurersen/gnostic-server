const Joi = require('@hapi/joi');

const userLoginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

const userRegisterValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

const userFindValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email()
    };
    return Joi.validate(data, schema);
};

const userUpdateValidation = (data) => {
    const schema = {
        _id: Joi.string().required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
};

const userDeleteValidation = (data) => {
    const schema = {
        _id: Joi.string().required()
    };
    return Joi.validate(data, schema);
};

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userUpdateValidation = userUpdateValidation;
module.exports.userFindValidation = userFindValidation;
module.exports.userDeleteValidation = userDeleteValidation;
module.exports.userLoginValidation = userLoginValidation;