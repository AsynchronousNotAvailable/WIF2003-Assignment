const SalesService = require("../services/salesService");

exports.getTopSellingStats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const stats = await SalesService.topSellingCategory(sellerId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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