class SaveInventoryDTO {
  constructor({ productId, productName, quantity, type }) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.type = type || "IN";
  }
}

module.exports = SaveInventoryDTO;
