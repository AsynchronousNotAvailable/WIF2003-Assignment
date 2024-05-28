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
    deleted: { type: Boolean, required: true },
    image: [{type: String, required: false}]
});

exports.ProductModel = mongoose.model("Product", productSchema);
