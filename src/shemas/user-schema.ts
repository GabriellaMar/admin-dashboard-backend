import Joi, { Schema } from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userSignUpJoiSchema: Schema = Joi.object({
    userName: Joi.string()
    .required(),
    email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({
        'any.required': 'Missing required product id',
    }),
    password: Joi.string()
    .min(6).
    required(),
})


export const userSignInJoiSchema: Schema = Joi.object({
    email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({
        'any.required': 'Missing required product id',
    }),
    
    password: Joi.string()
    .min(6)
    .required(),
})