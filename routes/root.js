const Router = require("express").Router();
const calculate = require("./calculate");

Router.use("/calculate", calculate);

module.exports = Router;
