const express = require("express");

const securedRouter = express.Router()

securedRouter.use('/')

module.exports = securedRouter