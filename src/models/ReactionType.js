const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ReactionType",
    {
      id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.ENUM("like", "heart", "chê"),
        defaultValue: "chê",
      },
      iconURL: {
        type: DataTypes.STRING,
        field: 'icon_url'
      },
    },
    {
      tableName: "reaction_types",
      timestamps: false,
    }
  );
};
