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
  quantity: Joi.number().positive().required().messages({
    "number.base": "A quantidade deve ser um número",
    "number.positive": "A quantidade deve ser maior que zero",
    "any.required": "A quantidade é obrigatória",
  }),
});

module.exports = inventorySchema;
