const mongoose = require("mongoose");
const { OrderModel } = require("../models/order.js");
const { ProductModel } = require("../models/product.js");

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
