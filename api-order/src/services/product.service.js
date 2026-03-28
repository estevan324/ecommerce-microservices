const axios = require("axios");
require("dotenv").config({ quiet: true });

const CATALOG_API_URL = process.env.CATALOG_API_URL || "http://localhost:3003";
const INVENTORY_API_URL = process.env.INVENTORY_API_URL || "http://localhost:3002";

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const productService = {
  getProductById: async (productId) => {
    try {
      const response = await axiosInstance.get(`${CATALOG_API_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto ${productId}:`, error.message);
      return null;
    }
  },

  getProductsByIds: async (productIds) => {
    const products = [];
    for (const id of productIds) {
      const product = await productService.getProductById(id);
      if (!product) {
        throw new Error(`Produto com ID ${id} não encontrado na api-catalog`);
      }
      products.push(product);
    }
    return products;
  },

  validateStock: async (productId, quantity) => {
    try {
      const response = await axiosInstance.get(
        `${INVENTORY_API_URL}/inventories/${productId}`
      );
      
      const inventory = response.data;
      return inventory && inventory.quantity >= quantity;
    } catch (error) {
      console.error(
        `Erro ao validar estoque do produto ${productId}:`,
        error.message
      );
      return false;
    }
  },
};

module.exports = productService;
