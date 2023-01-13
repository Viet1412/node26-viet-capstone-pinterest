const { User } = require("../models");

const generateDataToTest = async () => {
  await User.destroy({ truncate: true });

  for (let index = 1; index < 11; index++) {
    await User.create({
      firstName: `dev ${index}`,
      lastName: `dev`,
      email: `dev${index}@g.co`,
      password: `${index}`,
    });
  }
};

module.exports = generateDataToTest;
