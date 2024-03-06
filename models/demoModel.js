const  DataType  = require("sequelize");
const sequelize = require("../config/dbConnection.js");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");
const bcrypt = require("bcrypt");
// const { database } = require("../config/db.config");

let DemoData = sequelize.define(
  "demo",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataType.STRING, allowNull: false },
    email: { type: DataType.STRING, allowNull: false },
    password: { type: DataType.STRING, allowNull: false },
  },
  {
    timestamps: false,
    createdAt: "createdAt",
    updatedAt: "updateAt",
  }
);

DemoData.beforeCreate(async (demo) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(demo.password, salt);
    demo.password = hashedPassword;
  } catch (error) {
    console.log("Error in hashedPassword : ", error.toString());
  }
});

DemoData.prototype.validPassword = async function (password) {
  const comparePassword = await bcrypt.compare(password, this.password);
  return comparePassword;
};

DemoData.prototype.toJson = function () {
  const data = Object.assign({}, this.get());
  return data;
};

sequelizeTransforms(DemoData);
sequelizePaginate.paginate(DemoData);
module.exports = DemoData;
