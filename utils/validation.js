const joi = require("joi");
const validationSchema = require("../validation/demoValidation");

exports.validateWithJoi = (payload, schemaKeys) => {
  const { error } = schemaKeys.validate(payload, {
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
