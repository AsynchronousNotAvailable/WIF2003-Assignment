const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesControllers");


router.get("/:sellerId/topSellingCategory", salesController.getTopSellingCategoryStats);
router.get("/:sellerId/orderStats", salesController.getOrderStatusStats);
router.get("/:sellerId/reviewStats", salesController.getReviewStats);
router.get("/:sellerId/revenueStats", salesController.getRevenueStats);
router.get("/:sellerId/topSellingProducts", salesController.getTopSellingProducts);
router.get("/:sellerId/topWishlistedProducts", salesController.getTopWishlistedProducts)
router.get("/:sellerId/customerStats",salesController.getCustomerStats)

module.exports = router;