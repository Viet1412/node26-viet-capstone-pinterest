const express = require("express");
const authenRouter = require("./publicAPIs/authen.router");
const userRouters = require("./publicAPIs/users.routers");
// const securedRouter = require("./securedAPIs");

const v1 = express.Router();

// //public APIs
v1.use("/authen", authenRouter);
v1.use("/users", userRouters);



// //secured APIs
// // v1.use('/secured', securedRouter)

module.exports = v1;
