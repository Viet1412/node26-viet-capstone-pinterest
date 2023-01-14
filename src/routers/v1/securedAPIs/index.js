const express = require("express");
const securedUserRouters = require("./users.secured_routers");

const securedRouters = express.Router()

securedRouters.use('/users', securedUserRouters)

module.exports = securedRouters