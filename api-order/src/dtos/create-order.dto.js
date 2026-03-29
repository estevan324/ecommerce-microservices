class CreateOrderDTO {
  constructor({ userId, paymentMethod, products }) {
    this.userId = userId;
    this.paymentMethod = paymentMethod;
    this.products = products;
  }
}

module.exports = CreateOrderDTO;
