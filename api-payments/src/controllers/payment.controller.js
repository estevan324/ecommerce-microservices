const CreatePaymentDTO = require("../dtos/create-payment.dto");
const paymentService = require("../services/payment.service");

const paymentController = {
  pay: async (req, res) => {
    try {
      const paymentRequest = new CreatePaymentDTO(req.body);

      const payment = await paymentService.pay(paymentRequest);

      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
