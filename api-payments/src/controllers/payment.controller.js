const { UniqueConstraintError } = require("sequelize");
const CreatePaymentDTO = require("../dtos/create-payment.dto");
const paymentService = require("../services/payment.service");
const paymentSchema = require("../schemas/payment.schema");

const paymentController = {
  pay: async (req, res) => {
    try {
      const { error } = paymentSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const paymentRequest = new CreatePaymentDTO(req.body);

      const payment = await paymentService.pay(paymentRequest);

      return res.status(200).json(payment);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).json({
          error: "Pagamento para este pedido já foi realizado",
        });
      }

      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
