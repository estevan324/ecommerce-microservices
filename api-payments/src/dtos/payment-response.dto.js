class PaymentResponseDTO {
  constructor(payment) {
    this.id = payment.id;
    this.description = payment.description;
    this.amount = payment.amount;
    this.paymentMethod = payment.paymentMethod;
    this.status = payment.status;
    this.orderId = payment.orderId;
    this.createdAt = payment.createdAt;
  }
}

module.exports = PaymentResponseDTO;
