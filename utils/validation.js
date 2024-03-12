const joi = require("joi");
const  schemaKey  = require("../schema/demoSchema");

exports.validateWithJoi = (payload, schemaKey) => {
  const { error } = schemaKey.validate(payload, {
    abortEarly: false,
    convert: false,
  });
  if (error) {
    const msg = error.details.map((e) => e.message).join("\n");
    return {
      isValid: false,
      msg,
    };
  }
  return { isValid: true };
};
