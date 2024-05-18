const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// username: String,
// password: String
// productId: [productId],
// orderId: [OrderId]
const sellerSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true, maxLength: 100, unique: true },
    lastName: { type: String, required: true, maxLength: 100, unique: true },
    password: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

exports.SellerModel = mongoose.model("Seller", sellerSchema);
