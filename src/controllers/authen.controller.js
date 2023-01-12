const authenService = require("../services/authen.service");

require("dotenv").config();


const authenController = {
  signUp: () => {
    return async (req, res, next) => {
      try {
        dataSignUp = req.body;
        const createdUser = authenService.signUp(dataSignUp)
        res.status(200).json({data: createdUser});
      } catch (error) {
        console.error("-------->", error);
        res.status(500).json({error:error});

        throw error;
      }
    };
  },

  logIn: () => {
    return async (req, res, next) => {
      try {
        const dataLogIn = req.body;
        const user = await authenService.logIn(dataLogIn)

        
        res.status(200).json({data: user});
      } catch (error) {
        console.error("-------->", error);

        throw error;
      }
    };
  },
};

module.exports = authenController;
