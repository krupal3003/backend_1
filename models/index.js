const dbConnection = require("../config/dbConnection.js");

const db = {};
db.Sequelize = dbConnection;
db.demo = require("./demoModel.js");

module.exports =  db ;
