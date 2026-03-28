const Joi = require("joi");
const PAYMENT_METHOD = require("../enums/payment-method.enum");

const createOrderSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "O ID do usuário deve ser uma string",
    "any.required": "O ID do usuário é obrigatório",
  }),

  paymentMethod: Joi.string()
    .valid(...Object.values(PAYMENT_METHOD))
    .required()
    .messages({
      "any.only": "Método de pagamento inválido",
      "any.required": "O método de pagamento é obrigatório",
      "string.empty": "O método de pagamento é obrigatório",
    }),

  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required().messages({
          "string.base": "O ID do produto deve ser uma string",
          "any.required": "O ID do produto é obrigatório",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "A quantidade deve ser um número",
          "number.min": "A quantidade deve ser no mínimo 1",
          "any.required": "A quantidade é obrigatória",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Os produtos devem ser um array",
      "array.min": "Deve haver no mínimo 1 produto",
      "any.required": "Os produtos são obrigatórios",
    }),
});

module.exports = { createOrderSchema };
