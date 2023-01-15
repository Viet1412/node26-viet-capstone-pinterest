const respone = require("../helpers/response");
const pictureService = require("../services/pictures.service");

const pictureController = {
  getPictureList: () => {
    return async (req, res, next) => {
      try {
        const pictureList = await pictureService.getPictureList();
        res.status(200).json(respone(pictureList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  searchPicturesByName: () => {
    return async (req, res, next) => {
      try {
        const { pictureName } = req.body;

        const pictureList = await pictureService.searchPicturesByName(
          pictureName
        );
        res.status(200).json(respone(pictureList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getPictureDetails: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const pictureDetails = await pictureService.getPictureDetails(id);
        res.status(200).json(respone(pictureDetails));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewPictures = req.body;
        const { user } = res.locals;

        const newPictures = await pictureService.create(dataNewPictures, user);
        res.status(200).json(respone(newPictures));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = pictureController;
