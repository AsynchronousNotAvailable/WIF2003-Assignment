// services/sellerService.js
const mongoose = require("mongoose");
const { SellerModel } = require("../models/seller.js");
const { ProductModel } = require("../models/product.js");
const { OrderModel } = require("../models/order.js");
const { ReviewModel } = require("../models/review.js");
//support function to get user data by its username, wont throw exception to controller
async function checkSellerByUsername(username) {
    const seller = await SellerModel.findOne({ username: username });
    return seller;
}
//support function to validate registration, wont throw exception to controller
async function checkSellerByEmail(email) {
    const seller = await SellerModel.findOne({ email: email });
    console.log("FOUND", seller);
    return seller;
}

exports.login = async (loginData) => {
    const seller = await SellerModel.findOne({
        email: loginData.emailAddress,
        password: loginData.password,
    });
    if (!seller) {
        throw new Error("Seller Not Found");
    }
    return seller;
};

exports.getSellerById = async (sellerId) => {
    const seller = await SellerModel.findById(sellerId);
    if (!seller) {
        throw new Error("Seller Not Found");
    }
    return seller;
};

exports.getSellerByEmail = async (email) => {
    const seller = await SellerModel.findOne({ email: email });
    if (!seller) {
        throw new Error("Seller Not Found");
    }
    return seller;
};

exports.getSellerByUsername = async (username) => {
    const seller = await SellerModel.findOne({ username: username });
    if (!seller) {
        throw new Error("Seller Not Found");
    }
    return seller;
};

exports.createSeller = async (sellerData) => {
    if (!sellerData.email.endsWith("@syopi.com")) {
        throw new Error("Invalid Email Format For Seller");
    }
    const checkExistingSellerWithEmail = await checkSellerByEmail(
        sellerData.email
    );
    const checkExistingSellerWithUsername = await checkSellerByUsername(
        sellerData.username
    );
    if (checkExistingSellerWithEmail) {
        throw new Error("Existing Seller With Same Email");
    }
    if (checkExistingSellerWithUsername) {
        throw new Error("Existing Seller With Same Username");
    }

    const newSeller = new SellerModel(sellerData);
    if (!newSeller) {
        throw new Error("Invalid Seller data");
    }

    await newSeller.save();
    return newSeller;
};

exports.addProduct = async (username, newProductData) => {
    try {
        if (!checkSellerByUsername(username)) {
            throw new Error("Seller Not Found");
        }
        const seller = await SellerModel.findOne({ username: username });
        const checkDupProduct = await ProductModel.findOne({
            name: newProductData.name,
        });
        if (checkDupProduct) {
            throw new Error("Duplicate Product Found");
        }
        const newProduct = new ProductModel({
            ...newProductData,
            seller: seller._id,
        });

        seller.products.push(newProduct._id);
        await newProduct.save();
        await seller.save();

        return newProduct;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

//delete product
exports.deleteProduct = async (username, productId) => {
    const seller = await SellerModel.findOne({ username: username });

    if (!seller) {
        throw new Error("Seller Not Found");
    }

    const productToBeDeleted = await ProductModel.findById(
        new mongoose.Types.ObjectId(productId),
        { new: true }
    )
        .populate("reviews")
        .populate("seller");

    if (!productToBeDeleted) {
        throw new Error("Product Not Found");
    }

    for (let i = 0; i < productToBeDeleted.reviews.length; i++) {
        const reviewId = new mongoose.Types.ObjectId(
            productToBeDeleted.reviews[i]._id
        );
        const updateReview = await ReviewModel.findByIdAndDelete(reviewId, {
            new: true,
        });

        if (!updateReview) {
            throw new Error("Failed To Delete Review Of Product");
        }
    }

    // check if the product belongs to the seller
    if (
        !productToBeDeleted.seller._id.equals(
            new mongoose.Types.ObjectId(seller._id)
        )
    ) {
        throw new Error("Product Does Not Belong To Seller");
    }
    // let found = false;
    // for (let i = 0; i < seller.products.length; i++){
    //     if (seller.products[i] === new mongoose.Types.ObjectId(productId)) {
    //         found = true;
    //         break;
    //     }
    // };
    const updateSeller = await SellerModel.findByIdAndUpdate(
        seller._id,
        {
            $pull: {
                products: productToBeDeleted._id,
            },
        },
        { new: true }
    );

    if (!updateSeller) {
        throw new Error("Failed To Update Seller");
    }

    await ProductModel.findByIdAndDelete(
        new mongoose.Types.ObjectId(productId)
    );
};
//update product
exports.updateProduct = async (username, productId, updateProductData) => {
    const seller = await SellerModel.findOne({ username: username });

    if (!seller) {
        throw new Error("Seller Not Found");
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(productId),
        {
            $set: {
                ...updateProductData,
            },
        }
    );

    if (!updatedProduct) {
        throw new Error("Failed To Update Product");
    }

    return updatedProduct;
};

exports.getOrders = async (username) => {
    const seller = await SellerModel.findOne({ username: username });

    if (!seller) {
        throw new Error("Seller Not Found");
    }

    const orders = await OrderModel.find({ sellerId: seller._id });

    if (!orders) {
        throw new Error("Orders Not Found");
    }

    return orders;
};

exports.getProducts = async (username) => {
    const seller = await SellerModel.findOne({ username: username });

    if (!seller) {
        throw new Error("Seller Not Found");
    }

    const products = await ProductModel.find({ seller: seller._id })
        .populate("seller")
        .populate("reviews");

    if (!products) {
        throw new Error("Products Not Found");
    }

    return products;
};
