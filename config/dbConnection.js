const { Sequelize } = require("sequelize");
const db = require("./db.config.js");

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  port: db.port,
  logging: true,
});
try {
   sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error.toString());
}
module.exports = sequelize;
