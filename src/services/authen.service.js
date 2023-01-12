const { User } = require("../models");

const authenService = {
  signUp: async (dataSignUp) => {
    try {
        if (dataSignUp.email.trim()=='' || dataSignUp.password.trim()=='') {
            throw new Error("missing required data to sign up");
        }

      const user = await User.findOne({ where: { email: dataSignUp.email } });
      if (user) {
        throw new Error("email already exists");
      }

      const createdUser = await User.create(dataSignUp);
      console.log('=====================: ', createdUser.id);
      return createdUser;
    } catch (error) {
      throw error;
    }
  },

  logIn: async (dataLogIn) => {
    try {

      const user = await User.findOne({ where: { email: dataLogIn.email } });
      if (!user) {
        throw new Error("user not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },


};

module.exports = authenService
