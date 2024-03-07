const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");
const { json } = require("sequelize");
const { Sequelize } = require("sequelize");
// var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
const Product = db.product;

exports.createProduct = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.status(404).json("File not found");
    }

    const filename = req.file.filename;

    const productData = {
      product_name: req.body.product_name,
      product_type: req.body.product_type,
      product_price: req.body.product_price,
      product_image: filename,
    };
    const data = await Product.create(productData);
    console.log(data);
    if (data) {
      res.status(201).json(data);
    } else {
      res.status(400).json("Product not created");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "sonthing went wrong", error: error.toString() });
  }
});

exports.productByName = asyncHandler(async (req, res) => {
  try {
    const { product_name } = req.query;

    console.log("product_name", product_name);
    const data = await Product.findAll({
      where: { product_name: product_name },
    });
    console.log("Data ", data);

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json("No product found");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "sonthing went wrong", error: error.toString() });
  }
});

exports.productByPriceRange = asyncHandler(async (req, res) => {
  try {
    const { product_price } = req.query;
    const parsed_product_price = parseFloat(product_price);

    if (parsed_product_price < 10) {
      return res
        .status(400)
        .json({ message: "Product price should be at least 10" });
    }

    const minPrice = 10;

    const data = await Product.findAll({
      where: {
        product_price: {
          [Sequelize.Op.between]: [minPrice, parsed_product_price],
        },
      },
    });

    if (data.length === 0) {
      res.json({ message: "No product found" });
    } else {
      res.status(200).json(data);
    }
    console.log("Product Price", data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.toString() });
  }
});

exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const productData = req.body;
    const findData = await Product.findOne({ where: { id: id } });

    if (!findData) {
      return res.status(404).json({ message: "Product not found" });
    }

    let data;

    if (req.file) {
      const oldImage = findData.product_image;
      const oldImagePath = path.join(__dirname, "../public/images/") + oldImage;
      productData.product_image = req.file.filename;

      data = await Product.update(productData, {
        where: { id: findData.id },
      });

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("Image cannot be deleted:", err);
        } else {
          console.log("Image deleted");
        }
      });
      res.json({ data: data });
    } else {
      data = await Product.update(productData, {
        where: { id: findData.id },
      });
      res.json(data);
    }

    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.toString() });
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  try {
    // console.log(req);
    const id = req.query.id;
    const findData = await Product.findOne({ where: { id: id } });

    if (!findData) {
      return res.status(404).json({ message: "Product not found" });
    }

    let data;

    if (findData) {
      const oldImage = findData.product_image;
      const oldImagePath = path.join(__dirname, "../public/images/") + oldImage;

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("Image cannot be deleted:", err);
        } else {
          console.log("Image deleted");
        }
      });
      data = await Product.destroy({
        where: { id: findData.id },
      });
      res.json({ message: "Data Deleted" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.toString() });
  }
});
