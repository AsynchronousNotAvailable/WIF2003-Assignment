const SalesService = require("../services/salesService");

exports.getTopSellingCategoryStats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const stats = await SalesService.topSellingCategory(sellerId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTopSellingProducts = async (req,res) => {
    try {
        const {sellerId} = req.params;
        const productStats = await SalesService.topSellingProducts(sellerId);
        return res.status(200).json(productStats)
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

exports.getTopWishlistedProducts = async (req,res) => {
    try {
        const {sellerId} = req.params;
        const topWishlistedProducts = await SalesService.topWishlistedProducts(sellerId);
        return res.status(200).json(topWishlistedProducts)
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

exports.getCustomerStats = async (req,res) => {
    try {
        const {sellerId} = req.params;
        const customerStats = await SalesService.customerStats(sellerId);
        return res.status(200).json(customerStats)
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}
exports.getOrderStatusStats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const stats = await SalesService.orderStatusForSeller(sellerId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewStats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const stats = await SalesService.customerReviewStats(sellerId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getRevenueStats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const stats = await SalesService.revenuePerMonth(sellerId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};