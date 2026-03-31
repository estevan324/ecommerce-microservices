const axios = require("axios");
require("dotenv").config({ quiet: true });

const INVENTORY_API_URL = process.env.INVENTORY_API_URL || "http://localhost:3002";

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const inventoryClient = {
  /**
   * @param {string} productId 
   * @param {number} quantity
   * @param {string} productName 
   * @returns {Promise<Object>}
   */
  decrementStock: async (productId, quantity, productName) => {
    try {

      const requestPayload = {
        productId,
        quantity: quantity,
        productName,
      };


      const response = await axiosInstance.put(`${INVENTORY_API_URL}/inventories`, requestPayload);

      return response.data;
    } catch (error) {
      console.error(`   Erro: ${error.message}`);
     
      throw new Error(`Erro ao atualizar estoque do produto ${productId}: ${error.message}`);
    }
  },
};

module.exports = inventoryClient;
