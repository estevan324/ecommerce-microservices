const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "O nome do produto é obrigatório",
    "any.required": "O nome do do produto é obrigatório",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "O preço do produto deve ser um número",
    "number.positive": "O preço do produto deve ser maior que zero",
    "any.required": "O preço do produto é obrigatória",
  }),
  description: Joi.string(),
  initialQuantity: Joi.number().integer().min(0).messages({
    "number.base": "A quantidade inicial deve ser um número inteiro",
    "number.integer": "A quantidade inicial deve ser um número inteiro",
    "number.min": "A quantidade inicial deve ser maior ou igual a zero",
  }),
});

module.exports = productSchema;
