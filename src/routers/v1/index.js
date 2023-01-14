const express = require("express");
const authorization = require("../../middlewares/authorization");
const authenRouter = require("./publicAPIs/authen.router");
const userRouters = require("./publicAPIs/users.routers");
const securedRouters = require("./securedAPIs");

const v1 = express.Router();

// //public APIs
v1.use("/authen", authenRouter);
v1.use("/users", userRouters);



// //secured APIs
v1.use('/secured', authorization, securedRouters)

module.exports = v1;
