const express = require("express");
const passport = require('passport')
const {authenticateDemo} = require('./config/authConfig/demoAuth.js')
const models = require("./models/index.js");
const demoRoute = require('./routes/demoRoute.js')

const exp = express();
authenticateDemo(passport)
exp.use(express.json());
if (true) {
  models.Sequelize.sync({ alert: true })
    .then(() => {})
    .finally(() => {});
}
exp.use('/api/demo',demoRoute)
const port = process.env.PORT || 3000;
exp.listen(port, () => {
  console.log("server is running, ", port);
});
