const { AppError } = require("../helpers/error");
const { User, Picture, Comment } = require("../models");

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
        throw new AppError(404, "User not found");
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

  create: async (dataNewUser) => {
    try {
      const user = await User.findOne({ where: { email: dataNewUser.email } });
      if (user) {
        throw new AppError(400, "Email already exists");
      }

      if (!dataNewUser.password) {
        dataNewUser.password = Math.random().toString(36).substring(5);
      }

      const newUser = await User.create(dataNewUser);

      return newUser;
    } catch (error) {
      throw error;
    }
  },

  delete: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      await User.destroy({ where: { id: userId } });

      return user;
    } catch (error) {
      throw error;
    }
  },

  update: async (userId, dataUpdateUser, requester) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (requester.role !== "admin" && requester.id !== user.id) {
        throw new AppError(403, "Not permitted");
      }

      if (Object.keys(dataUpdateUser).length == 0) {
        throw new AppError(400, "nothing to update");
      }

      if (dataUpdateUser.email !== user.email) {
        const isEmailExists = await User.findOne({
          where: { email: dataUpdateUser.email },
        });
        if (isEmailExists) {
          throw new AppError(400, "Email already exists");
        }
      }

      dataUpdateUser.id = userId;

      if (requester.role == "admin") {
        await User.update(dataUpdateUser, {
          where: { id: userId },
        });
      }

      if (requester.id == user.id) {
        dataUpdateUser.role = "user";
        await User.update(dataUpdateUser, {
          where: { id: userId },
        });
      }

      return await User.findByPk(userId);
    } catch (error) {
      throw error;
    }
  },

  givesComment: async (pictureId, commentContent, requester) => {
    try {
      const picture = await Picture.findByPk(pictureId);
      if (!picture) {
        throw new AppError(404, "Picture not found");
      }

      if (!commentContent.trim()) {
        throw new AppError(400, "not enough word to make a comment");
      }

      const newComment = await Comment.create({
        userId: requester.id,
        pictureId: picture.id,
        content: commentContent,
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userService;
