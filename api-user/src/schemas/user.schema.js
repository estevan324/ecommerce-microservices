const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "O nome é obrigatório",
    "any.required": "O nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O email deve ser válido",
    "string.empty": "O email é obrigatório",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter no mínimo 6 caracteres",
    "string.empty": "A senha é obrigatória",
    "any.required": "A senha é obrigatória",
  }),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O email deve ser válido",
    "string.empty": "O email é obrigatório",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().required().messages({
    "string.empty": "A senha é obrigatória",
    "any.required": "A senha é obrigatória",
  }),
});

module.exports = { createUserSchema, loginUserSchema };
