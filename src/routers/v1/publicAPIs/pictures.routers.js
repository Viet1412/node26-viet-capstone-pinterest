const express = require("express");
const pictureController = require("../../../controllers/pictures.controller");

const pictureRouters = express.Router();

pictureRouters.get("", pictureController.getPictureList());
pictureRouters.post("", pictureController.searchPicturesByName());
pictureRouters.get("/details/:id", pictureController.getPictureDetails());
pictureRouters.get(
  "/details/:id/comments",
  pictureController.getCommentsOfPicture()
);

module.exports = pictureRouters;
