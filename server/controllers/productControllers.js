const ProductService = require("../services/productService");

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductService.getAllProducts();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const productReviews = await ProductService.getProductReviews(productId);
        res.json(productReviews);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await ProductService.getOneProduct(productId);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
