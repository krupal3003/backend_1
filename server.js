const express = require("express");
const passport = require("passport");
const { authenticateDemo } = require("./config/authConfig/demoAuth.js");
const models = require("./models/index.js");
const demoRoute = require("./routes/demoRoute.js");
const productRoute = require("./routes/productRout.js");
const cors = require("cors");
const path = require("path");

const exp = express();
const corsOptions = { origin: process.env.ALLOW_ORIGIN };
exp.use(cors(corsOptions));

authenticateDemo(passport);
exp.use(express.json());
exp.use(express.urlencoded({ extended: false }));
exp.use(express.static(path.join(__dirname, "public")));
if (true) {
  models.Sequelize.sync({ alert: true })
    .then(() => {})
    .finally(() => {});
}
exp.use("/api/demo", demoRoute);
exp.use("/api/product", productRoute);
const port = process.env.PORT || 3000;
exp.listen(port, () => {
  console.log("server is running, ", port);
});
