const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const token = jwt.sign({ id: data.id }, "demoSecreteKey", {
    expiresIn: "1h",
  });
  console.log(token);
  return token;
};

module.exports = { generateToken };
