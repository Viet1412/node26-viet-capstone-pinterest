const { AppError } = require("../helpers/error");
const { User } = require("../models");

const userService = {
  get: async (userId) => {
    try {
      if (userId) {
        const user = await User.findByPk(userId, {
          include: [
            {
              association: "ownPictures",
              attributes: {
                exclude: ["ownerId"],
              },
            },
          ],
        });
        if (user) {
          return user;
        }
        throw new AppError(400, "User not found");
      }

      const users = await User.findAll({
        include: [
          {
            association: "ownPictures",
            attributes: {
              exclude: ["ownerId"],
            },
          },
        ],
      });
      return users;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userService;
