const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const db = require("../models/index");
const demoSchema = require("../validation/demoValidation");
const validation = require("../utils/validation");
const Demo = db.demo;

exports.createDemo = asyncHandler(async (req, res) => {
  try {
    const demoData = req.body;
    console.log();
    const valid = validation.validateWithJoi(demoData, demoSchema.schemaKeys);
    if (!valid.isValid) {
      return res.send({
        message: `Invalid values in parameters, ${valid.msg}`,
      });
    }

    if (
      demoData.name.trim().length === 0 ||
      demoData.email.trim().length === 0 ||
      demoData.password.trim().length === 0
    ) {
      res.json({ message: "Data can not be empty" });
    } else {
      await Demo.create(demoData)
        .then((data) => res.status(201).json({ data: data }))
        .catch((err) => res.json(err.toString()));
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Somthing went wrong", error: error.toString() });
  }
});

exports.getAllDemo = asyncHandler(async (req, res) => {
  try {
    const demoData = await Demo.findAll();
    if (demoData.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json(demoData);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Somthing went wrong", error: error.toString() });
  }
});

exports.deleteDemo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const demoData = await Demo.destroy({ where: { id: id } });
    console.log("Demo data from demo controller ", demoData);
    if (demoData) {
      res.status(200).json({ message: "Data deleted successfully " });
    } else {
      res.status(404).json("Data not Found");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Somthing went wrong", error: error.toString() });
  }
});

exports.updateDemo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const data = req.body;
    const demoData = await Demo.update(data, { where: { id: id } });
    console.log("Demo data Update from demo controller", demoData);
    if (demoData.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.status(200).json({ message: "Data updated successfully " });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Somthing went wrong", error: error.toString() });
  }
});

exports.getDemoById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Demo.findOne({ where: { id: id } });
    if (!data) {
      res.status(404).json({ message: "No Demo" });
    } else {
      res.status(200).json({ data: data, token: generateToken(data) });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Somthing went wrong", error: error.toString() });
  }
});
