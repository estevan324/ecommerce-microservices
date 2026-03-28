class SaveInventoryDTO {
  constructor({ productId, productName, quantity }) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
  }
}

module.exports = SaveInventoryDTO;
