// controllers/customerController.js

const CustomerService = require("../services/customerService");
const mongoose = require("mongoose");

exports.login = async (req, res) => {
    console.log('login');
    try {
        const loginData = req.body;
        const customer = await CustomerService.login(loginData);
        res.json({ message: "Login Successful", customer: customer });
    } catch (error) {
        if (error.message === "Customer Not Found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getCustomerByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const customer = await CustomerService.getCustomerByUsername(username);
        res.json(customer);
    } catch (error) {
        if (error.message === "Customer Not Found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.createCustomer = async (req, res) => {
   
    try {
        console.log(req.body);
        const { firstName, lastName, username, email, password } = req.body;
        const customerData = {
            firstName,
            lastName,
            username,
            email,
            password,
            orderId: [],
            cards: [],
        };
        const newCustomer = await CustomerService.createCustomer(customerData);
        res.status(201).json(newCustomer);
    } catch (error) {
        if (error.message === "Invalid customer data") {
            res.status(400).json({ error: error.message });
        } else if (
            error.message === "Existing Customer With Same Email" ||
            error.message === "Existing Customer With Same Username"
        ) {
            res.status(409).json(error.message);
        } else {
            res.status(500).json(error.message);
            console.log(error)
        }
    }

    
};

//get cart

exports.getCart = async (req, res) => {
    try {
        const username = req.params.username;
        const cart = await CustomerService.getCart(username);

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//addToCart
exports.addToCart = async (req, res) => {
    try {
        const username = req.params.username;
        const { productId, quantity } = req.body;
        const updatedCart = await CustomerService.addToCart(
            username,
            productId,
            quantity
        );
        res.status(201).json(updatedCart);
    } catch (err) {
        if (
            err.message === "Customer Not Found" ||
            err.message === "Product Not Found" ||
            err.message === "Cart Not Found"
        ) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// get Card
exports.getCard = async (req, res) => {
    try {
        const username = req.params.username;

        const cards = await CustomerService.getCard(username);

        res.status(200).json(cards);
    } catch (error) {
        if (error.message === "Customer Not Found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// add Card
exports.addCard = async (req, res) => {
    try {
        const username = req.params.username;
        const cardDetails = req.body;

        const addedCard = await CustomerService.addCard(username, cardDetails);

        res.status(200).json(addedCard);
    } catch (error) {
        if (error.message === "Customer Not Found") {
            res.status(404).json({ error: error.message });
        } else if (error.message === "Duplicate Card Found") {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

// removeCard
exports.removeCard = async (req, res) => {
    try {
        const username = req.params.username;
        const cardId = req.params.cardId;

        await CustomerService.removeCard(username, cardId);
        res.status(200).json({ message: "Card Removed Successfully" });
    } catch (error) {
        if (
            error.message === "Customer Not Found" ||
            error.message === "Card Not Found"
        ) {
            res.status(404).json({ error: error.message });
        } else if (error.message === "Card Does Not Belong To Customer") {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

//deleteFromCart
exports.deleteFromCart = async (req, res) => {
    try {
        const username = req.params.username;
        const cartItemId = req.params.cartItemId;
        const updatedCart = await CustomerService.deleteFromCart(
            username,
            cartItemId
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        if (
            err.message === "Customer Not Found" ||
            err.message === "Cart Not Found"
        ) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

//checkout + place Order + create transaction
exports.checkOut = async (req, res) => {
    try {
        const username = req.params.username;
        const { payment_method, payment_date } = req.body;
        const payment = await CustomerService.checkout(
            username,
            payment_method,
            payment_date
        );

        res.status(200).json(payment);
        //create orders
        //create transaction
        //clear cart
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.orderReceived = async (req, res) => {
    try {
        const username = req.params.username;
        const orderId = req.params.orderId;
        const { time_received } = req.body; //orderId []

        const updatedOrders = await CustomerService.orderReceived(
            username,
            orderId,
            time_received
        );

        res.status(200).json(updatedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.orderHistory = async (req, res) => {
    try {
        const username = req.params.username;
        const orderHistory = await CustomerService.orderHistory(username);
        res.status(200).json(orderHistory);
    } catch (error) {
        if (
            error.message === "Customer Not Found" ||
            error.message === "Orders Not Found"
        )
            res.status(404).json({ error: error.message });
        else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.addReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const username = req.params.username;

        const { title, description, stars } = req.body;

        const productReview = await CustomerService.addReview(
            username,
            productId,
            title,
            description,
            stars
        );

        res.status(200).json(productReview);
    } catch (error) {
        if (
            error.message === "Customer Not Found" ||
            error.message === "Product not Found"
        ) {
            res.status(404).json({ error: error.message });
        } else if (error.message === "Failed to create review") {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviewId = req.params.reviewId;

        const updatedProduct = await CustomerService.deleteReview(
            productId,
            reviewId
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.message === "Review Not Found") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
