const express = require("express");
const configs = require("./config");
const { sequelize } = require("./models");
const v1 = require("./routers/v1");

const app = express();
app.use(express.json());
// app.use(express.static())

sequelize.sync({alter: true})

app.use("/api/v1", v1);
// app.use("/tes", (req, res) => { res.json('okkkk') });

app.listen(configs.PORT);
