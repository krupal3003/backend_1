const jwt = require("jsonwebtoken");
const passport = require("passport");
const { JWT } = require("../constant/demoConstant");
const db = require("../models/index");

const verifyDemo = (req, resolve, reject) => async (err, demo,info ) => {
  if (err || info || !demo) {
    return reject("Unauthorized demo");
  }
  req.demo = demo;
  resolve();
};

const auth = () => async (req, res, next) => {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "demo_auth",
        { session: false },
        verifyDemo(req, resolve, reject)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        console.log(err.toString());
        return res.status(401).json("Unauthorized");
      });
  } catch (error) {
    console.log("ERROR from middleware ", error.toString());
  }
};

module.exports = auth;
