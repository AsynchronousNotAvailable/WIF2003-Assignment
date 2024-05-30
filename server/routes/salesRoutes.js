const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesControllers");


router.get("/:sellerId/topSelling", salesController.getTopSellingStats);
router.get("/:sellerId/orderStats", salesController.getOrderStatusStats);
router.get("/:sellerId/reviewStats", salesController.getReviewStats);
router.get("/:sellerId/revenueStats", salesController.getRevenueStats);

module.exports = router;