const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models/index");
const {JWT} = require("../../constant/demoConstant");
const Demo = db.demo;

const authenticateDemo = async (passport) => {
  const op = {};
  op.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  op.secretOrKey = JWT.DEMO_SECRET;
  passport.use(
    "demo_auth",
    new Strategy(op, async (payload, done) => {
      try {
        const data = await Demo.findOne;
        ({ id: payload.id });
        if (data) {
          return done(null, data);
        } else {
          return done("No demo found");
        }
      } catch (error) {
        console.log("authenticateDemo error", error.toString());
      }
    })
  );
};

module.exports = { authenticateDemo };
