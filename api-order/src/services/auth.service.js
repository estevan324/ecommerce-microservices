const jwt = require("jsonwebtoken");

const authService = {
  /**
   * Verify JWT token
   * @param {string} token
   * @returns {object}
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  },
};

module.exports = authService;
