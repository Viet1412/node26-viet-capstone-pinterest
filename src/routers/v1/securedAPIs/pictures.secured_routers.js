const express = require("express");
const pictureController = require("../../../controllers/pictures.controller");

const pictureManagementRouters = express.Router();

pictureManagementRouters.post("", pictureController.create());

module.exports = pictureManagementRouters;
