const LoginUserDTO = require("../dtos/login-user.dto");
const authService = require("../services/auth.service");
const { loginUserSchema } = require("../schemas/user.schema");

const authController = {
  login: async (req, res) => {
    try {
      const { error } = loginUserSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const loginRequest = new LoginUserDTO(req.body);
      const response = await authService.login(loginRequest);

      return res.status(200).json(response);
    } catch (error) {
      if (
        error.message === "Email ou senha inválidos"
      ) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
