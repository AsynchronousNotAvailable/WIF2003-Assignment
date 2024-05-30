const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    //_id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String, required: true },
    variation: [{ type: String, required: true }],
    pricePerUnit: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    category: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "Seller" },
    quantity: { type: Number, required: true },
    createdDateTime: { type: Date, required: true },
    average_rating: { type: Number, required: true, default: 0 },
    deleted: { type: Boolean, required: true, default: false },
    image: [{ type: String, required: false }],
    soldQuantity: { type: Number, default: 0 },
});

exports.ProductModel = mongoose.model("Product", productSchema);
