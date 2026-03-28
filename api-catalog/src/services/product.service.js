const axios = require("axios");
const CreateProductDTO = require("../dtos/create-product.dto");
const ProductResponseDTO = require("../dtos/product-response.dto");
const ProductModel = require("../models/Product");
const sequelize = require("../config/database");

const productService = {
  /**
   * @param {CreateProductDTO} productDTO
   * @returns {Promise<ProductResponseDTO>}
   */
  save: async (productDTO) => {
    const transaction = await sequelize.transaction();

    try {
      const product = await ProductModel.create(productDTO, { transaction });

      await axios.put(`${process.env.INVENTORY_API_URL}/inventories`, {
        productId: product.id,
        productName: productDTO.name,
        quantity: productDTO.initialQuantity,
      });

      await transaction.commit();

      return new ProductResponseDTO({
        ...product.toJSON(),
        quantity: productDTO.initialQuantity,
      });
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  getAll: async () => {
    const products = await ProductModel.findAll();

    const result = await Promise.all(
      products.map(async (product) => {
        const inventory = await axios.get(
          `${process.env.INVENTORY_API_URL}/inventories/${product.id}`,
        );

        return new ProductResponseDTO({
          ...product.toJSON(),
          quantity: inventory.data.quantity,
        });
      }),
    );

    return result;
  },
  findById: async (id) => {
    const product = await ProductModel.findByPk(id);
    const inventory = await axios.get(
      `${process.env.INVENTORY_API_URL}/inventories/${id}`,
    );

    return new ProductResponseDTO({
      ...product.toJSON(),
      quantity: inventory.data.quantity,
    });
  },
};

module.exports = productService;
