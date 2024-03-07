const express = require("express");
const auth = require("../middleware/demoMiddleware");
const {validationMiddleware} = require("../middleware/demoValidationM");
const demoContrller = require("../controllers/demoController");
const router = express.Router();

router.post("/createDemo", validationMiddleware, demoContrller.createDemo);
router.get("/getAllDemo", auth(), demoContrller.getAllDemo);
router.delete("/deleteDemo", auth(), demoContrller.deleteDemo);
router.patch("/updateDemo", auth(), demoContrller.updateDemo);
router.post("/getDemoById", demoContrller.getDemoById);
module.exports = router;
