const axios = require("axios");
require("dotenv").config({ quiet: true });

const PAYMENT_API_URL = process.env.PAYMENT_API_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const paymentClient = {
  /**
   *
   * @param {Object} paymentData
   * @returns {Promise<Object>}
   */
  pay: async (paymentData) => {
    try {
      const requestPayload = {
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        description: paymentData.description,
      };

      const response = await axiosInstance.post(`${PAYMENT_API_URL}/payments`, requestPayload);

      return response.data;
    } catch (error) {  
      throw new Error(`Erro ao processar pagamento: ${error.message}`);
    }
  },
};

module.exports = paymentClient;
