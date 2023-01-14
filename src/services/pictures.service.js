const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { Picture } = require("../models");

const pictureService = {
  getPictureList: async () => {
    try {
      const pictureList = await Picture.findAll({
        include: [
          {
            association: "owner",
            attributes: {
              exclude: ["password", "role", "age", "email"],
            },
          },
        ],
        attributes: {
          exclude: ["ownerId"],
        },
      });
      return pictureList;
    } catch (error) {
      throw error;
    }
  },

  searchPicturesByName: async (pictureName) => {
    try {
      const pictureListByName = await Picture.findAll({
        where: { name: { [Op.like]: `%${pictureName}%` } },
        include: [
          {
            association: "owner",
            attributes: {
              exclude: ["password", "role", "age", "email"],
            },
          },
        ],
        attributes: {
          exclude: ["ownerId"],
        },
      });
      return pictureListByName;
    } catch (error) {
      throw error;
    }
  },

  getPictureDetails: async (pictureId) => {
    try {
      const pictureDetails = await Picture.findByPk(pictureId, {
        include: [
          {
            association: "owner",
            attributes: {
              exclude: ["password", "role"],
            },
          },
          {
            association: "hasCommentsFromUsers",
            attributes: {
              exclude: ["password", "role", "age", "email"],
            },
            through: {
              association: 0,
              as: "givesComments",
              attributes: {
                exclude: ["userId", "pictureId"]
              },
            },
          },
        ],
        attributes: {
          exclude: ["ownerId"],
        },
      });
      if (pictureDetails) {
        return pictureDetails;
      }
      throw new AppError(404, "picture not found");
    } catch (error) {
      throw error;
    }
  },

  // create: async (dataNewUser) => {
  //   try {
  //     const user = await User.findOne({ where: { email: dataNewUser.email } });
  //     if (user) {
  //       throw new AppError(400, "Email already exists");
  //     }

  //     if (!dataNewUser.password) {
  //       dataNewUser.password = Math.random().toString(36).substring(5);
  //     }

  //     const newUser = await User.create(dataNewUser);

  //     return newUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // delete: async (userId) => {
  //   try {
  //     const user = await User.findByPk(userId);
  //     if (!user) {
  //       throw new AppError(404, "User not found");
  //     }

  //     await User.destroy({ where: { id: userId } });

  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // update: async (userId, dataUpdateUser, requester) => {
  //   try {
  //     const user = await User.findByPk(userId);
  //     if (!user) {
  //       throw new AppError(404, "User not found");
  //     }

  //     if (requester.role !== "admin" && requester.id !== user.id) {
  //       throw new AppError(403, "Not permitted");
  //     }

  //     if (Object.keys(dataUpdateUser).length == 0) {
  //       throw new AppError(400, "nothing to update");
  //     }

  //     if (dataUpdateUser.email !== user.email) {
  //       const isEmailExists = await User.findOne({
  //         where: { email: dataUpdateUser.email },
  //       });
  //       if (isEmailExists) {
  //         throw new AppError(400, "Email already exists");
  //       }
  //     }

  //     dataUpdateUser.id = userId;

  //     if (requester.role == "admin") {
  //       await User.update(dataUpdateUser, {
  //         where: { id: userId },
  //       });
  //     }

  //     if (requester.id == user.id) {
  //       dataUpdateUser.role = "user";
  //       await User.update(dataUpdateUser, {
  //         where: { id: userId },
  //       });
  //     }

  //     return await User.findByPk(userId);
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};

module.exports = pictureService;
