const ProductService = require("../services/productService");

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductService.getAllProducts();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
