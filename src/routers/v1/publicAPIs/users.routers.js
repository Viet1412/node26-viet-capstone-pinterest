const express = require("express");
const userController = require("../../../controllers/users.controller");

const userRouters = express.Router();

userRouters.get("/:id", userController.getUserDetail());
userRouters.get("/:id/ownPictures", userController.getUserOwnPictures());
userRouters.get("/:id/savedPictures", userController.getUserSavedPictures());

module.exports = userRouters;
