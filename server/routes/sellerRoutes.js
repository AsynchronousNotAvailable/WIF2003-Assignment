const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerControllers");
router.post("/login", sellerController.login);

router.get("/all", sellerController.getAllSellers); //added by kw

router.get('/:sellerId/customers', sellerController.getAllCustomers);

router.get("/:username", sellerController.getSellerByUsername);

router.post("/register", sellerController.createSeller);

router.post("/:username/product/new", sellerController.addProduct);
//delete product
router.delete("/:username/:productId/delete", sellerController.deleteProduct);
//edit product
router.put("/:username/:productId/edit", sellerController.editProduct);
//retrieve orders
router.get("/:username/orders", sellerController.getOrders);
//retrieve products
router.get("/:username/products", sellerController.getProducts);

router.get("/:username/products/:productId", sellerController.getProductById); 

module.exports = router;
