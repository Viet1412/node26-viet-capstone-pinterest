const express = require("express");
const userController = require("../../../controllers/users.controller");

const userRouters = express.Router();

userRouters.get("/:id?", userController.get());

module.exports = userRouters;
