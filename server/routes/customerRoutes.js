const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerControllers');


router.get('/:username', customerController.getCustomerByUsername);

router.post('/new', customerController.createCustomer);

router.post('/:username/addToCart', customerController.addToCart);

router.get("/:username/cart", customerController.getCart);

router.delete("/:username/deleteFromCart/:cartItemId", customerController.deleteFromCart);

router.get("/:username/getCard", customerController.getCard);

router.post("/:username/addCard", customerController.addCard);

router.delete("/:username/:cardId/removeCard", customerController.removeCard);

router.put('/:username/checkout', customerController.checkOut);
//order received
router.put("/:username/:orderId/orderReceived", customerController.orderReceived);
//retrive order history
router.get("/:username/orderHistory", customerController.orderHistory);
//add review
router.post("/:username/:productId/addReview", customerController.addReview);
//delete review ??
router.delete("/:username/:productId/:reviewId/deleteReview", customerController.deleteReview);
//add order received timestamp??
module.exports = router;