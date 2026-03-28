const User = require("../models/User");
const UserResponseDTO = require("../dtos/user-response.dto");

const userService = {
  /**
   * @param {CreateUserDTO} userDTO
   * @returns {Promise<UserResponseDTO>}
   */
  create: async (userDTO) => {
    const user = new User({
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
    });

    await user.save();
    return new UserResponseDTO(user);
  },

  findById: async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
      return null;
    }

    return new UserResponseDTO(user);
  },

  findByEmail: async (email) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  },
};

module.exports = userService;
