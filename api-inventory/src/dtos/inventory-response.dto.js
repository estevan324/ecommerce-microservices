class InventoryResponseDTO {
  constructor({ productId, productName, quantity, createdAt, updatedAt }) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = InventoryResponseDTO;
