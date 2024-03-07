const dbConnection = require("../config/dbConnection.js");

const db = {};
db.Sequelize = dbConnection;
db.demo = require("./demoModel.js");
db.product = require("./productModel.js");

module.exports = db;
