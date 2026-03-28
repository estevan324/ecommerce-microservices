class CreatePaymentDTO {
  constructor({ description, amount, paymentMethod, orderId }) {
    this.description = description;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.orderId = orderId;
  }
}

module.exports = CreatePaymentDTO;
