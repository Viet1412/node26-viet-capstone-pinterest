const express = require("express");
const securedUserRouters = require("./users.secured_routers");

const securedRouters = express.Router()

securedRouters.use('/usersManagement', securedUserRouters)

module.exports = securedRouters