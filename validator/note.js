const Joi = require('@hapi/joi');

const noteCreateValidation = (data) => {
    const schema = {
        topic: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        tags: Joi.array().items(Joi.string())
    };
    return Joi.validate(data, schema);
};

const noteUpdateValidation = (data) => {
    const schema = {
        _id: Joi.string().required(),
        topic: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        tags: Joi.array().items(Joi.string())
    };
    return Joi.validate(data, schema);
};

const noteDeleteValidation = (data) => {
    const schema = {
        _id: Joi.string().required()
    };
    return Joi.validate(data, schema);
};

module.exports.noteCreateValidation = noteCreateValidation;
module.exports.noteUpdateValidation = noteUpdateValidation;
module.exports.noteDeleteValidation = noteDeleteValidation;