const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerControllers');

router.get('/all', customerController.getAllCustomers); //added by kw

router.get('/:customerId/sellers', customerController.getAllSellers);

router.post('/:login', customerController.login);

router.get('/:username', customerController.getCustomerByUsername);

router.post('/register', customerController.createCustomer);

router.post('/:username/addToCart', customerController.addToCart);

router.get("/:username/cart", customerController.getCart);

router.delete("/:username/deleteFromCart/:cartItemId", customerController.deleteFromCart);

router.post("/:username/updateShippingAddress", customerController.updateShippingAddress);

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