const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { fileURLToPath } = require("url");
const router = express.Router();
const productController = require("../controllers/productController");

// const __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
console.log("storage", storage);

const upload = multer({ storage: storage }).single("file");

const upmiddle = promisify(upload);

router.post("/createProduct", upmiddle, productController.createProduct);
router.get("/productByName", productController.productByName);
router.get("/productByPriceInBetweeen", productController.productByPriceRange);
router.post("/updateProduct", upmiddle, productController.updateProduct);
router.get("/deleteProduct", productController.deleteProduct);

module.exports = router;
