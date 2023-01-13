const { User, Picture } = require("../models");

const generateDataToTest = {
 users: async () => { 
  await User.destroy({ truncate: true });

  for (let index = 1; index < 11; index++) {
    await User.create({
      firstName: `dev ${index}`,
      lastName: `dev`,
      email: `dev${index}@g.co`,
      password: `${index}`,
    });
  }

  },
  
 pictures: async () => { 
  
  await Picture.destroy({ truncate: true });
  for (let index = 1; index < 11; index++) {
    await Picture.create({
      name: `picture ${index}`,
      url: `url  ${index}`,
      description: `description of picture ${index}`,
      ownerId: `${index}`,
    });
  }
}
};

module.exports = generateDataToTest;
