const Joi = require("joi");

const inventorySchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "O id do produto é obrigatório",
    "any.required": "O id do produto é obrigatório",
  }),
  productName: Joi.string().required().messages({
    "string.empty": "O nome do produto é é obrigatório",
    "any.required": "O nome do produto é é obrigatório",
  }),
  quantity: Joi.number().integer().min(0).messages({
    "number.base": "A quantidade deve ser um número",
    "number.min": "A quantidade inicial deve ser maior ou igual a zero",
    "any.required": "A quantidade é obrigatória",
  }),
});

module.exports = inventorySchema;
