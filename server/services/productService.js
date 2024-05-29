const { ProductModel } = require("../models/product");
const { ReviewModel } = require("../models/review");
const { mongoose } = require("mongoose");
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

exports.getProductReviews = async (productId) => {
    try {
        const product = await ProductModel.findById(
            new mongoose.Types.ObjectId(productId)
        );

        if (!product) {
            throw new Error("Product Not Found");
        }

        const reviewIds = product.reviews;
        console.log(reviewIds);
        let reviews = [];
        for (id in reviewIds) {
            console.log(id);
            const review = await ReviewModel.findById(reviewIds[id]).populate("customer");
            if (!review) {
                throw new Error("Review Not Found");
            }
            reviews.push(review);
        }

        return reviews;
    } catch (error) {
        throw new Error(error.message);
    }
};
