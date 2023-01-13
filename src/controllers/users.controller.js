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
};

module.exports = userController