const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("./user.service");
const LoginResponseDTO = require("../dtos/login-response.dto");

const authService = {
  /**
   * Generate JWT token
   * @param {string} userId
   * @returns {string}
   */
  generateToken: (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "24h",
    });
  },

  /**
   * @param {LoginUserDTO} loginDTO
   * @returns {Promise<LoginResponseDTO>}
   */
  login: async (loginDTO) => {
    const user = await userService.findByEmail(loginDTO.email);

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    const passwordMatch = await bcrypt.compare(
      loginDTO.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Email ou senha inválidos");
    }

    const accessToken = authService.generateToken(user.id);
    return new LoginResponseDTO(accessToken);
  },

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
