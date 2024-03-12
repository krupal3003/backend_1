const dbConnection = require("../config/dbConnection.js");

const db = {};
db.Sequelize = dbConnection;
db.demo = require("./demoModel.js");
db.product = require("./productModel.js");

db.product.belongsTo(db.demo, {
  foreignKey: "demoId",
  as: "product",
  targetKey: "id",
});

module.exports = db;
