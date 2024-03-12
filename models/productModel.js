const DataType = require("sequelize");
const sequelize = require("../config/dbConnection");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    demoId: {
      type: DataType.INTEGER,
    },
    product_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    product_type: {
      type: DataType.JSON,
      allowNull: false,
    },
    product_price: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    product_image: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: "createdAt",
    updatedAt: "updateAt",
  }
);
Product.prototype.toJson = function () {
  const data = Object.assign({}, this.get());
  return data;
};

sequelizeTransforms(Product);
sequelizePaginate.paginate(Product);
module.exports = Product;
