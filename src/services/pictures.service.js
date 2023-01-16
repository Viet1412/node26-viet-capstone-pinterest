const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { Picture } = require("../models");

const pictureService = {
  getPictureList: async () => {
    try {
      const pictureList = await Picture.findAll({
        include: [
          {
            association: "owner",
            attributes: {
              exclude: ["password", "role", "age", "email"],
            },
          },
        ],
        attributes: {
          exclude: ["ownerId"],
        },
      });
      return pictureList;
    } catch (error) {
      throw error;
    }
  },

  searchPicturesByName: async (pictureName) => {
    try {
      const pictureListByName = await Picture.findAll({
        where: { name: { [Op.like]: `%${pictureName}%` } },
        include: [
          {
            association: "owner",
            attributes: {
              exclude: ["password", "role", "age", "email"],
            },
          },
        ],
        attributes: {
          exclude: ["ownerId"],
        },
      });
      return pictureListByName;
    } catch (error) {
      throw error;
    }
  },

  getPictureDetails: async (pictureId) => {
    try {
      const pictureDetails = await Picture.findByPk(pictureId, {
        include: [
          {
            association: "owner",
            attributes: {
              exclude: ["password", "role"],
            },
          },
          {
            association: "hasCommentsFromUsers",
            attributes: {
              exclude: ["password", "role", "age", "email"],
            },
            through: {
              association: 0,
              as: "givesComments",
              attributes: {
                exclude: ["userId", "pictureId"],
              },
            },
          },
        ],
        attributes: {
          exclude: ["ownerId"],
        },
      });
      if (pictureDetails) {
        return pictureDetails;
      }
      throw new AppError(404, "picture not found");
    } catch (error) {
      throw error;
    }
  },

  create: async (dataNewPictures, requester) => {
    try {
      if (dataNewPictures.length == 0) {
        throw new AppError(400, "data cannot be empty");
      }

      const newPictures = [];
      for (let index = 0; index < dataNewPictures.length; index++) {
        const newPicture = await Picture.create({
          name: dataNewPictures[index].name,
          url: dataNewPictures[index].url,
          description: dataNewPictures[index].description,
          ownerId: requester.id,
        });
        newPictures.push(newPicture);
      }

      return newPictures;
    } catch (error) {
      throw error;
    }
  },

  delete: async (pictureId, requester) => {
    try {
      const picture = await Picture.findByPk(pictureId);
      if (!picture) {
        throw new AppError(404, "picture not found");
      }

      if (requester.role !== "admin" && requester.id !== picture.ownerId) {
        throw new AppError(403, "Not permitted");
      }

      await Picture.destroy({ where: { id: pictureId } });

      return picture;
    } catch (error) {
      throw error;
    }
  },

  update: async (pictureId, dataUpdatePicture, requester) => {
    try {
      if (Object.keys(dataUpdatePicture).length == 0) {
        throw new AppError(400, "nothing to update");
      }

      const picture = await Picture.findByPk(pictureId);
      if (!picture) {
        throw new AppError(404, "picture not found");
      }

      if (requester.role !== "admin" && requester.id !== picture.ownerId) {
        throw new AppError(403, "Not permitted");
      }

      if (
        dataUpdatePicture.ownerId !== picture.ownerId &&
        requester.role !== "admin"
      ) {
        throw new AppError(403, "Only admin can change owner_id");
      }

      //keep id & url unchanged
      dataUpdatePicture.id = pictureId;
      dataUpdatePicture.url = picture.url;

      await Picture.update(dataUpdatePicture, { where: { id: pictureId } });

      return await Picture.findByPk(pictureId);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = pictureService;
