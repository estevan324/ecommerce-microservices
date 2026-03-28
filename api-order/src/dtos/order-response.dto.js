const OrderItemResponseDTO = require("./order-item-response.dto");

class OrderResponseDTO {
  constructor(order, items) {
    this.paymentMethod = order.paymentMethod;
    this.products = items.map((item) => new OrderItemResponseDTO(item));
    this.paymentStatus = order.paymentStatus;
    this.createdAt = order.createdAt;
    this.amount = order.totalAmount;
  }
}

module.exports = OrderResponseDTO;
