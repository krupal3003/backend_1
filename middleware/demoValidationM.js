const { validateWithJoi } = require("../utils/validation");
const { schemaKeys } = require("../schema/demoSchema");

exports.validationMiddleware = (req, res, next) => {
  try {
    const validationResult = validateWithJoi(req.body, schemaKeys);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: "Do proper validation" });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
