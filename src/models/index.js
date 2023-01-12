const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

// Kiểm tra kết nối tới database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected Okk");
  } catch (error) {
    console.log("Sequelize Errorrr", error);
  }
})();

//Initiate Models
const User = require("./User")(sequelize);

module.exports = {
  sequelize,
  User,
};
