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
        const {pictureName} = req.body;

        const pictureList = await pictureService.searchPicturesByName(pictureName);
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

  // create: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const dataNewUser = req.body;
  //       const newUser = await userService.create(dataNewUser);
  //       res.status(201).json(respone(newUser));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // delete: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;

  //       const user = await userService.delete(id);
  //       res.status(200).json(respone(`User <${user.firstName}> with id-${user.id} deleted`));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },

  // update: () => {
  //   return async (req, res, next) => {
  //     try {
  //       const { id } = req.params;
  //       const dataUpdateUser = req.body;
  //       const {user} = res.locals;

  //       const updatedUser = await userService.update(id, dataUpdateUser, user);
  //       res.status(200).json(respone(updatedUser));
  //     } catch (error) {
  //       console.error("-------->: ", error);
  //       next(error);
  //     }
  //   };
  // },
};

module.exports = pictureController;
