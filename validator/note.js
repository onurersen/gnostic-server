const Joi = require('@hapi/joi');

// note validation
const noteValidation = (data) => {
    const schema = {
        topic: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        tags: Joi.array().items(Joi.string())
    };
    return Joi.validate(data, schema);
};

module.exports.noteValidation = noteValidation;