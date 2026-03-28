class CreateOrderDTO {
  constructor({ userId, paymentMethod, products }) {
    this.userId = userId;
    this.paymentMethod = paymentMethod;
    this.products = products; // Array de { id, quantity }
  }
}

module.exports = CreateOrderDTO;
