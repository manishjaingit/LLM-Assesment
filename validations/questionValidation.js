import Joi from "joi";

const getAnswer = {
    query: Joi.object().keys({
        model: Joi.string().empty().valid('ollama2', 'mistral').required(),
        question: Joi.string().empty().required()
    }),
};

export {
    getAnswer
};