const express = require("express");
const userController = require("../../../controllers/users.controller");
const requiredRole = require("../../../middlewares/requiredRoles");

const securedUserRouters = express.Router();

securedUserRouters.post("", requiredRole('admin'), userController.create());
securedUserRouters.delete("/:id", userController.delete());
securedUserRouters.put("/:id", userController.update());

module.exports = securedUserRouters;
