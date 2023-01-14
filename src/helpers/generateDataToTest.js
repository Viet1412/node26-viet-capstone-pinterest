// should config manually to generate suitable testing data

const { User, Picture } = require("../models");

const generateDataToTest = {
 users: async () => { 
  await User.destroy({ truncate: true });

  for (let index = 1; index < 11; index++) {
    await User.create({
      firstName: `dev ${index}`,
      lastName: `dev`,
      age: `${20 + index}`,
      email: `dev${index}@g.co`,
      password: `${index}`,
    });
  }

  },
  
 pictures: async () => { 
  await Picture.destroy({ truncate: true });

  for (let index = 0; index < 20; index++) {
    await Picture.create({
      name: `picture ${index+1}`,
      url: `url  ${index+1}`,
      description: `description of picture ${index+1}`,
      ownerId: `${index%10+1}`,
    });
  }
}
};

module.exports = generateDataToTest;
