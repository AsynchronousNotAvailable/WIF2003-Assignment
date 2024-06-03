const mongoose = require("mongoose");
const { OrderModel } = require("../models/order.js");
const { ProductModel } = require("../models/product.js");
const { CustomerModel } = require("../models/customer.js");
const { CartModel } = require("../models/cart.js");

exports.topSellingCategory = async (sellerId) => {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const ordersForSeller = await OrderModel.find({
        sellerId: sellerObjectId,
    }).populate("product");
    let stats = {};
    for (let order of ordersForSeller) {
        const category = order.product.category;
        if (!stats[category]) {
            stats[category] = order.quantity;
        } else {
            stats[category] += order.quantity;
        }
    }

    return stats;
};

exports.topWishlistedProducts = async (sellerId) => {
    try {
        const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

        // Find all customers and populate their wishlists
        const customerInfo = await CustomerModel.find().populate("wishlist");
        const carts = await CartModel.find();
        let topWishlistedProducts = [];
        let productWishlistCount = {};
        let productCartMap = {};

        for(let cart of carts){
            for(let item of cart.cartItem){
                const productId = item.product.toString();
                if(!productCartMap[productId]){
                    productCartMap[productId] = 1;
                }
                else {
                    productCartMap[productId]++;
                }
            }
        }

        console.log(productCartMap)
        // Iterate through each customer
        for (let customer of customerInfo) {
            const customerWishlist = customer.wishlist;

            // Iterate through each product in the customer's wishlist
            for (let productId of customerWishlist) {
                // Find the product from the ProductModel based on the productId
                const product = await ProductModel.findById(productId);
                const stringedProductId = product._id.toString();
                console.log("Current Product ID [String]", stringedProductId);
                console.log("Product Cart Map result below")
                console.log(productCartMap[stringedProductId])
                // Check if the product's seller matches the provided sellerId
                if (product.seller.equals(sellerObjectId)) {
                    if(!productWishlistCount[stringedProductId]){
                        productWishlistCount[stringedProductId] = 1;
                    }
                    else {
                        productWishlistCount[stringedProductId]++;
                    }
                    // Include the product in the list of top wishlisted products
                    topWishlistedProducts.push({
                        productId: product._id,
                        productName: product.name,
                        productImage: product.image[0],
                        wishlistCount : productWishlistCount[stringedProductId],
                        cartCount : productCartMap[stringedProductId] || 0
                        
                    });
                }
            }
        }
        return topWishlistedProducts;
    } catch (error) {
        throw new Error(error);
    }
};

exports.customerStats = async (sellerId) => {
    try {
        const orders = await OrderModel.find({ sellerId: sellerId }).populate("customerId");
        let customerStats = [];
        let customerOrderMap = {};
        for(let order of orders){
            console.log("Getting current Order")
            console.log(order.customerId._id)
            const customerStringId = order.customerId._id.toString();
            console.log("Customer Name")
            console.log(order.customerId.username)
            //find if it is not in the map
            if (!customerOrderMap[customerStringId]){
                customerOrderMap[customerStringId] = {
                    customerId : customerStringId,
                    name: order.customerId.username,
                    img : order.customerId.pfp,
                    totalOrders : 1,
                    totalSpent : order.totalPricePerOrder,
                    lastOrder : order.time_placed,
                }
                customerStats.push(customerOrderMap[customerStringId]);
            }
            // if it is in the map, update the stats
            else {
                customerOrderMap[customerStringId].totalOrders++;
                customerOrderMap[customerStringId].totalSpent += order.totalPricePerOrder;

                if(order.time_placed > customerOrderMap[customerStringId].lastOrder){
                    customerOrderMap[customerStringId].lastOrder = order.time_placed;
                }
                const index = customerStats.findIndex(customer => customer.customerId === customerStringId);
                // Update the specific fields in the existing entry with the updated values
                customerStats[index].totalOrders = customerOrderMap[customerStringId].totalOrders;
                customerStats[index].totalSpent = customerOrderMap[customerStringId].totalSpent;
                customerStats[index].lastOrder = customerOrderMap[customerStringId].lastOrder;
            }
        }
        return customerStats;
    } catch (error) {
        throw new Error(error)
    }
}

exports.topSellingProducts = async (sellerId) => {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const orders = await OrderModel.find({ sellerId: sellerObjectId })
        .populate("product")
        .select("product quantity totalPricePerOrder");

    let productRevenueMap = {};

    // Iterate over each order to accumulate statistics per product
    for (let order of orders) {
        const product = order.product;
        const productId = product._id.toString();
        const totalPricePerOrder = order.totalPricePerOrder;

        // If the product is not already in the map, initialize its stats
        if (!productRevenueMap[productId]) {
            productRevenueMap[productId] = {
                productId: productId,
                productName: product.name,
                productImg: product.image[0],
                totalQuantitySold: 0,
                totalRevenue: 0
            };
        }

        // Update the accumulated stats for the product
        productRevenueMap[productId].totalQuantitySold += order.quantity;
        productRevenueMap[productId].totalRevenue += totalPricePerOrder;
    }

    // Convert the accumulated stats object into an array of product stats
    let cleanedProductStats = Object.values(productRevenueMap);

    cleanedProductStats.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
    let top3Products = cleanedProductStats.slice(0,3);
    return top3Products
};

exports.orderStatusForSeller = async (sellerId) => {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const orders = await OrderModel.find({ sellerId: sellerObjectId });
    let stats = {};
    let totalOrders = 0;
    for (let order of orders) {
        const orderStatus = order.status;
        console.log(orderStatus);
        if (!stats[orderStatus]) {
            stats[orderStatus] = 1;
        } else {
            stats[orderStatus]++;
        }
        totalOrders++;
    }

    //convert to percentage
    for (let key in stats) {
        stats[key] = ((stats[key] / totalOrders) * 100).toFixed(1);
    }

    return stats;
};

exports.customerReviewStats = async (sellerId) => {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const products = await ProductModel.find({
        seller: sellerObjectId,
    }).populate("reviews");
    let stats = {};
    let totalRatingCount = 0;
    let totalCountsPerRating = 0;
    for (let product of products) {
        const reviews = product.reviews;
        for (let review of reviews) {
            const rating = Number(Math.floor(review.stars).toFixed(0));
            if (!stats[rating]) {
                stats[rating] = 1;
            } else {
                stats[rating]++;
            }
            totalRatingCount++;
        }
    }

    for (let key in stats) {
        totalCountsPerRating += parseInt(key) * stats[key];
    }
    const averageRatingForSeller = (
        totalCountsPerRating / totalRatingCount
    ).toFixed(1);

    stats = { ...stats, shopRating: averageRatingForSeller };

    return stats;
};

exports.revenuePerMonth = async (sellerId) => {
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const orders = await OrderModel.find({ sellerId: sellerObjectId });
    let stats = {};
    for (let order of orders) {
        const month = order.time_placed.getMonth() + 1;
        let processedMonth = month;
        switch (month) {
            case 1:
                processedMonth = "January";
                break;
            case 2:
                processedMonth = "February";
                break;
            case 3:
                processedMonth = "March";
                break;
            case 4:
                processedMonth = "April";
                break;
            case 5:
                processedMonth = "May";
                break;
            case 6:
                processedMonth = "June";
                break;
            case 7:
                processedMonth = "July";
                break;
            case 8:
                processedMonth = "August";
                break;
            case 9:
                processedMonth = "September";
                break;
            case 10:
                processedMonth = "October";
                break;
            case 11:
                processedMonth = "November";
                break;
            case 12:
                processedMonth = "December";
                break;
        }

        console.log(month);
        if (!stats[processedMonth]) {
            stats[processedMonth] = order.totalPricePerOrder;
        } else {
            stats[processedMonth] += order.totalPricePerOrder;
        }
    }

    return stats;
};
