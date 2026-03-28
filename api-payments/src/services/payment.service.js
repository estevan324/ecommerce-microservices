const PaymentResponseDTO = require("../dtos/payment-response.dto");
const CreatePaymentDTO = require("../dtos/create-payment.dto");

const PAYMENT_METHOD = require("../enums/payment-method.enum");
const PAYMENT_STATUS = require("../enums/payment-status.enum");
const Payment = require("../models/Payment");

const paymentService = {
  /**
   * @param {CreatePaymentDTO} paymentDTO
   * @returns {Promise<PaymentResponseDTO>}
   */
  pay: async (paymentDTO) => {
    let status = PAYMENT_STATUS.APPROVED;

    if (
      paymentDTO.paymentMethod === PAYMENT_METHOD.CARTAO_CREDITO ||
      paymentDTO.paymentMethod === PAYMENT_METHOD.BOLETO
    ) {
      const denied = Math.random() < 0.3;

      status = denied ? PAYMENT_STATUS.REJECT : PAYMENT_STATUS.APPROVED;
    }

    const payment = new Payment({
      description: paymentDTO.description,
      amount: paymentDTO.amount,
      paymentMethod: paymentDTO.paymentMethod,
      status,
      orderId: paymentDTO.orderId,
    });

    await payment.save();

    return new PaymentResponseDTO(payment);
  },
};

module.exports = paymentService;
