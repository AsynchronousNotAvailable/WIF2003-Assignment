const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/marketplace", productController.getAllProducts);
//fetch review for product
module.exports = router;