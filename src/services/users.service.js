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
      if (Object.keys(dataNewUser).length == 0) {
        throw new AppError(400, "data cannot be empty");
      }

      const user = await User.findOne({ where: { email: dataNewUser.email } });
      if (user) {
        throw new AppError(400, "Email already exists");
      }

      //auto generate a random password if admin does not enter any value for password
      if (!dataNewUser.password) {
        dataNewUser.password = Math.random().toString(36).substring(5);
      }

      const newUser = await User.create(dataNewUser);

      //return this password to admin or email it to user and ask user to change password
      newUser.dataValues.passwordOfNewUserCreatedByAdmin = dataNewUser.password;

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
      if (Object.keys(dataUpdateUser).length == 0) {
        throw new AppError(400, "nothing to update");
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      if (requester.role !== "admin" && requester.id !== user.id) {
        throw new AppError(403, "Not permitted");
      }

      if (dataUpdateUser.role !== user.role && requester.role !== "admin") {
        throw new AppError(403, "Only admin can change role");
      }

      if (dataUpdateUser.email !== user.email) {
        const isEmailExists = await User.findOne({
          where: { email: dataUpdateUser.email },
        });
        if (isEmailExists) {
          throw new AppError(400, "Email already exists");
        }
      }

      //keep id unchanged
      dataUpdateUser.id = userId;

      await User.update(dataUpdateUser, {
        where: { id: userId },
      });

      return await User.findByPk(userId);
    } catch (error) {
      throw error;
    }
  },

  givesComment: async (pictureId, commentContent, requester) => {
    try {
      if (!commentContent.trim()) {
        throw new AppError(400, "not enough word to make a comment");
      }

      const picture = await Picture.findByPk(pictureId);
      if (!picture) {
        throw new AppError(404, "Picture not found");
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

  savesPicture: async (pictureId, requester) => {
    try {
      const picture = await Picture.findByPk(pictureId);
      if (!picture) {
        throw new AppError(404, "Picture not found");
      }

      const user = await User.findByPk(requester.id);
      if (!user) {
        throw new AppError(400, "User not found");
      }

      console.log(user.__proto__);
      console.log(picture.__proto__);

      const isSaved = await user.hasSavesPicture(pictureId);
      // const isSaved = await picture.hasSavedByUser(user.id);


      console.log("22222222222222222222222", await user.hasSavesPictures(pictureId));
      console.log("3333333333333333333333", await picture.hasSavedByUser(user.id));
      console.log("isSaved================== ", isSaved);
      if (isSaved) {
        await user.removeSavesPicture(pictureId);
        return "unsaved";
      } else {
        await user.addSavesPicture(pictureId);
        return "saved";
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userService;
