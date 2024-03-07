const joi = require("joi");
exports.schemaKeys = joi.object({
  name: joi.string().min(3).max(25).required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
exports.schemaKeys = joi.object({
  product_name: joi.string().min(3).max(10),
  product_type: joi.object().required(),
  product_price: joi.string().min(2).max(5),
  product_image: joi.string().required(),
});
