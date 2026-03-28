const Joi = require("joi");
const PAYMENT_METHOD = require("../enums/payment-method.enum");

const paymentSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.empty": "A descrição é obrigatória",
    "any.required": "A descrição é obrigatória",
  }),

  amount: Joi.number().positive().required().messages({
    "number.base": "O valor deve ser um número",
    "number.positive": "O valor deve ser maior que zero",
    "any.required": "O valor é obrigatório",
  }),

  paymentMethod: Joi.string()
    .valid(...Object.values(PAYMENT_METHOD))
    .required()
    .messages({
      "any.only": "Método de pagamento inválido",
      "any.required": "O método de pagamento é obrigatório",
      "string.empty": "O método de pagamento é obrigatório",
    }),

  orderId: Joi.string().required().messages({
    "any.required": "O ID do pedido é obrigatório",
    "string.empty": "O ID do pedido é obrigatório",
  }),
});

module.exports = paymentSchema;
