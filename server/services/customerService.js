// services/customerService.js

const { ProductModel } = require("../models/product.js");
const { CustomerModel } = require("../models/customer.js");
const { CartModel } = require("../models/cart.js");
const { OrderModel } = require("../models/order.js");
const mongoose = require("mongoose");
const { TransactionModel } = require("../models/transaction.js");
const { SellerModel } = require("../models/seller.js");
const { ReviewModel } = require("../models/review.js");
const { CardModel } = require("../models/card.js");

//support function to validate registration, wont throw exception to controller
async function checkCustomerByEmail(email) {
    const customer = await CustomerModel.findOne({ email: email });
    return customer;
}

//support function to get user data by its username, wont throw exception to controller
async function checkCustomerByUsername(username) {
    const customer = await CustomerModel.findOne({ username: username });
    return customer;
}

exports.login = async (loginData) => {
    const { emailAddress, password } = loginData;
    const customer = await CustomerModel.findOne({ email: emailAddress });
    if (!customer) {
        throw new Error("Customer Not Found");
    }
    if (customer.password !== password) {
        throw new Error("Invalid Login Credentaials");
    }

    return customer;
};

exports.getCustomerById = async (customerId) => {
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
        throw new Error("Customer Not Found");
    }
    return customer;
};

exports.getCustomerByEmail = async (email) => {
    const customer = await CustomerModel.findOne({ email: email });
    if (!customer) {
        throw new Error("Customer Not Found");
    }
    return customer;
};

exports.getCustomerByUsername = async (username) => {
    const customer = await CustomerModel.findOne({ username: username })
        .populate("orders")
        .populate("cart");
    if (!customer) {
        throw new Error("Customer Not Found");
    }
    return customer;
};

exports.createCustomer = async (customerData) => {
    const checkExistingCustomerWithEmail = await checkCustomerByEmail(
        customerData.email
    );
    const checkExistingCustomerWithUsername = await checkCustomerByUsername(
        customerData.username
    );

    if (checkExistingCustomerWithEmail) {
        throw new Error("Existing Customer With Same Email");
    }
    if (checkExistingCustomerWithUsername) {
        throw new Error("Existing Customer With Same Username");
    }
    const newCustomer = new CustomerModel(customerData);
    if (!newCustomer) {
        throw new Error("Invalid customer data");
    }

    const newCart = new CartModel({ cartItem: [] });
    // console.log(newCart);
    await newCart.save();

    newCustomer.cart = newCart;

    await newCustomer.save();
    return newCustomer;
};

exports.getCart = async (username) => {
    if (!checkCustomerByUsername(username)) {
        throw new Error("Customer Not Found");
    }
    const customer = await CustomerModel.findOne({ username: username });
    const cartId = customer.cart;

    const cart = await CartModel.findById(cartId).populate("cartItem.product");

    if (!cart) {
        throw new Error("Cart Not Found");
    }

    return cart;
};

exports.addToCart = async (username, prodId, quantity) => {
    if (!checkCustomerByUsername(username)) {
        throw new Error("Customer Not Found");
    }
    const productToAdd = await ProductModel.findById(
        new mongoose.Types.ObjectId(prodId)
    );
    if (!productToAdd) {
        throw new Error("Product Not Found");
    }

    // console.log(productToAdd);

    const customer = await CustomerModel.findOne({ username: username });

    if (!customer) {
        throw new Error("Customer Not Found");
    }

    const cart = await CartModel.findById(customer.cart).populate("cartItem");

    if (!cart) {
        throw new Error("Cart Not Found");
    }

    if (cart.cartItem.length === 0) {
        const newItem = { product: productToAdd._id, quantity: quantity };
        // console.log(newItem);
        cart.cartItem.push(newItem);
    } else {
        let found = false;
        cart.cartItem.forEach(async (cartItem) => {
            // console.log(cartItem.product, productToAdd._id);
            if (cartItem.product.equals(productToAdd._id)) {
                // console.log("yes");
                cartItem.quantity += quantity;
                found = true;
            }
        });

        if (!found) {
            const newItem = { product: productToAdd._id, quantity: quantity };
            cart.cartItem.push(newItem);
        }
    }

    await cart.save();
    return cart;
};

// cartItemId is productId in the cart, cartItem.product is referring to productId
exports.deleteFromCart = async (username, cartItemId) => {
    const customerExist = await checkCustomerByUsername(username);
    if (!customerExist) {
        throw new Error("Customer Not Found");
    }
    const customer = await CustomerModel.findOne({ username: username });

    const cart = await CartModel.findById(customer.cart);

    if (!cart) {
        throw new Error("Cart Not Found");
    }

    let deleted = false;

    cart.cartItem.forEach((cartItem) => {
        const cartItemObjId = new mongoose.Types.ObjectId(cartItemId);
        console.log(cartItemObjId, cartItem._id);
        if (cartItemObjId.equals(cartItem._id)) {
            cart.cartItem.remove(cartItem);
            deleted = true;
        }
    });

    if (deleted === false) {
        throw new Error(`Failed to delete cartItem with ${cartItemId}`);
    }

    await cart.save();
    return cart;
};

exports.getCard = async (username) => {
    const customer = await CustomerModel.findOne({ username: username });
    if (!customer) {
        throw new Error("Customer Not Found");
    }

    let cardList = [];
    for (let i = 0; i < customer.cards.length; i++) {
        const cardDetails = await CardModel.findById(customer.cards[i]);
        if (!cardDetails) {
            throw new Error("Failed To Retrieve Card");
        }
        cardList.push(cardDetails);
    }

    return cardList;
};

exports.addCard = async (username, cardDetails) => {
    const customerExist = await checkCustomerByUsername(username);
    if (!customerExist) {
        throw new Error("Customer Not Found");
    }
    const cardExists = await CardModel.findOne({
        cardNumber: cardDetails.cardNumber,
    });

    const customer = await CustomerModel.findOne({
        username: username,
    });

    if (cardExists) {
        throw new Error("Duplicate Card Found");
    }
    const newCard = await CardModel.create({ ...cardDetails });

    if (!newCard) {
        throw new Error("Failed To Create New Card");
    }

    customer.cards.push(newCard._id);

    await customer.save();
    await newCard.save();

    return newCard;
};

exports.removeCard = async (username, cardId) => {
    const customer = await CustomerModel.findOne({ username: username });
    if (!customer) {
        throw new Error("Customer Not Found");
    }

    const card = await CardModel.findById(new mongoose.Types.ObjectId(cardId));

    if (!card) {
        throw new Error("Card Not Found");
    }
    let found = false;
    for (let i = 0; i < customer.cards.length; i++) {
        if (customer.cards[i].equals(new mongoose.Types.ObjectId(card._id))) {
            found = true;
            break;
        }
    }

    if (found === false) {
        throw new Error("Card Does Not Belong To Customer");
    } else {
        customer.cards.remove(card._id);
        await customer.save();
        await CardModel.findByIdAndDelete(card._id);
    }
};

exports.checkout = async (username, payment_method, payment_date) => {
    const customer = await CustomerModel.findOne({ username: username });
    if (!customer) {
        throw new Error("Customer Not Found");
    }

    const cart = await CartModel.findById({ _id: customer.cart });

    if (!cart) {
        throw new Error("Cart Not Found");
    }

    let sellerList = [];
    let orderList = [];
    let totalTransactionPrice = 0;
    for (const cartItem of cart.cartItem) {
        // create one order for each cartItem
        const cartItemProduct = await ProductModel.findById({
            _id: cartItem.product,
        });
        if (!cartItemProduct) {
            throw new Error("Product Not Found");
        }

        const totalPricePerOrder =
            cartItemProduct.pricePerUnit * cartItem.quantity;

        const newOrderData = {
            customerId: customer._id,
            sellerId: cartItemProduct.seller,
            product: cartItemProduct._id,
            quantity: cartItem.quantity,
            totalPricePerOrder: totalPricePerOrder,
            status: "Pending",
            time_placed: new Date(
                new Date(payment_date).toLocaleString("en-US", {
                    timeZone: "Asia/Singapore",
                })
            ),
        };

        const newOrder = new OrderModel(newOrderData);
        if (!newOrder) {
            throw new Error("Failed To Create Order");
        }

        // console.log("order id", newOrder._id);
        orderList.push(newOrder._id);

        // console.log("seller id", newOrder.sellerId);
        sellerList.push(newOrder.sellerId);

        //update seller orders
        await SellerModel.findOneAndUpdate(
            { _id: newOrder.sellerId },
            { $push: { orders: newOrder._id } },
            { new: true }
        );

        totalTransactionPrice += newOrder.totalPricePerOrder;
        await newOrder.save();
    }

    // console.log("LIST");
    // console.log(orderList, sellerList, totalTransactionPrice);
    if (
        orderList.length === 0 ||
        sellerList.length === 0 ||
        totalTransactionPrice === 0
    ) {
        throw new Error("Transaction Error");
    }

    const newTransactionData = {
        sellers: sellerList,
        payment_date: new Date(
            new Date(payment_date).toLocaleString("en-US", {
                timeZone: "Asia/Singapore",
            })
        ),
        customer: customer._id,
        orders: orderList,
        payment_status: "Paid",
        payment_method: payment_method,
        totalTransactionPrice: totalTransactionPrice,
    };

    const newTransaction = await TransactionModel.create(newTransactionData);

    if (!newTransaction) {
        throw new Error("Failed To Create Transaction");
    }

    // update customer order history
    for (const order of orderList) {
        customer.orders.push(new mongoose.Types.ObjectId(order));
    }
    cart.cartItem = [];

    // console.log(customer.orders, cart);
    await cart.save();
    await customer.save();
    await newTransaction.save();

    const findTransaction = await TransactionModel.findById(newTransaction._id)
        .populate("sellers")
        .populate("orders")
        .populate("customer");

    // console.log({ findTransaction, cart });

    return { findTransaction, cart };
};

exports.orderReceived = async (username, orderId, time_received) => {
    const customer = await CustomerModel.findOne({ username: username });
    if (!customer) {
        throw new Error("Customer Not Found");
    }
    const customerId = customer._id;
    let updatedOrderList = [];
    for (const singleOrderId of customer.orders) {
        if (singleOrderId.equals(new mongoose.Types.ObjectId(orderId))) {
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(singleOrderId),
                    customerId: customerId,
                },
                {
                    $set: {
                        status: "Received",
                        time_received: new Date(
                            new Date(time_received).toLocaleString("en-US", {
                                timeZone: "Asia/Singapore",
                            })
                        ),
                    },
                },
                { new: true }
            )
                .populate("customerId")
                .populate("sellerId");

            if (!updatedOrder) {
                throw new Error(
                    `Failed to update order status of order: ${singleOrderId} `
                );
            }

            updatedOrderList.push(updatedOrder);
        }
    }

    return updatedOrderList;
};

exports.orderHistory = async (username) => {
    const customer = await CustomerModel.findOne({ username: username });
    if (!customer) {
        throw new Error("Customer Not Found");
    }
    const orders = await OrderModel.find({ customerId: customer._id })
        .populate("customerId")
        .populate("sellerId")
        .populate("product");
    if (!orders) {
        throw new Error("Orders Not Found");
    }

    return orders;
};

//order received
exports.addReview = async (username, productId, title, description, stars) => {
    const customer = await CustomerModel.findOne({ username: username });
    if (!customer) {
        throw new Error("Customer Not Found");
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
        throw new Error("Product Not Found");
    }

    const newReview = await ReviewModel.create({
        title: title,
        description: description,
        stars: stars,
        customer: customer._id,
    });

    if (!newReview) {
        throw new Error("Failed to create review");
    }

    product.reviews.push(newReview);

    await newReview.save();
    await product.save();

    return product;
};

exports.deleteReview = async (productId, reviewId) => {
    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        throw new Error("Review Not Found");
    }

    const product = await ProductModel.findByIdAndUpdate(
        productId,
        {
            $pull: {
                reviews: reviewId,
            },
        },
        { new: true }
    );

    if (!product) {
        throw new Error("Failed to delete review");
    }

    return product;
};
