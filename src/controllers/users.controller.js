const respone = require("../helpers/response");
const userService = require("../services/users.service");

const userController = {
  get: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const users = await userService.get(id);
        res.status(200).json(respone(users));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewUser = req.body;
        const newUser = await userService.create(dataNewUser);
        res.status(201).json(respone(newUser));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const user = await userService.delete(id);
        res.status(200).json(respone(`User <${user.firstName}> with id-${user.id} deleted`));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
  
  update: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const dataUpdateUser = req.body;
        const {user} = res.locals;

        const updatedUser = await userService.update(id, dataUpdateUser, user);
        res.status(200).json(respone(updatedUser));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  givesComment: () => {
    return async (req, res, next) => {
      try {
        const { pictureId } = req.params;
        const {commentContent} = req.body;
        const {user} = res.locals;

        const newComment = await userService.givesComment(pictureId, commentContent, user);
        res.status(200).json(respone(newComment));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = userController;
