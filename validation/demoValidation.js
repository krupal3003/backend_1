const joi = require("joi");
exports.schemaKeys = joi.object({
  name: joi.string().min(3).max(25).required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
