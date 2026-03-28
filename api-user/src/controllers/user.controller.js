const { UniqueConstraintError } = require("sequelize");
const CreateUserDTO = require("../dtos/create-user.dto");
const userService = require("../services/user.service");
const { createUserSchema } = require("../schemas/user.schema");

const userController = {
  create: async (req, res) => {
    try {
      const { error } = createUserSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const userRequest = new CreateUserDTO(req.body);
      const user = await userService.create(userRequest);

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).json({
          error: "Já existe um usuário com este email",
        });
      }

      return res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
