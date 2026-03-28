class CreateProductDTO {
  constructor({ name, description, price, initialQuantity }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.initialQuantity = initialQuantity || 0;
  }
}

module.exports = CreateProductDTO;
