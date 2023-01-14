const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Reaction",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      targetId: {
        type: DataTypes.INTEGER,
        field: "target_id",
      },
      reactionTypeId: {
        type: DataTypes.INTEGER,
        field: "reaction_type_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "reactions",
      timestamps: false,
    }
  );
};
