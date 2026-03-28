class ProductResponseDTO {
  constructor({ id, name, description, price, quantity, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = parseFloat(price);
    this.quantity = quantity;
    this.createdAt = createdAt;
  }
}

module.exports = ProductResponseDTO;
