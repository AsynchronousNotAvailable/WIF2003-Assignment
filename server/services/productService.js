const { ProductModel } = require("../models/product");

exports.getAllProducts = async () => {
    try {
        const allProducts = await ProductModel.find()
            .populate("reviews")
            .populate("seller");
        return allProducts;
    } catch (error) {
        throw new Error(error.message);
    }
};
