class OrderItemResponseDTO {
  constructor(orderItem) {
    this.name = orderItem.productName;
    this.quantity = orderItem.quantity;
    this.amount = orderItem.totalPrice;
  }
}

module.exports = OrderItemResponseDTO;
