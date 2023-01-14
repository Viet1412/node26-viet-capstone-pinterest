const express = require("express");
const {userManagementRouters, userActionRouters} = require("./users.secured_routers");

const securedRouters = express.Router()

securedRouters.use('/usersManagement', userManagementRouters)
securedRouters.use('/userAction', userActionRouters)

module.exports = securedRouters