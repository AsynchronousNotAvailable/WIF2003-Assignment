const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    sellerId: { type: Schema.Types.ObjectId, ref: "Seller" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    totalPricePerOrder: { type: Number },
    status: {
        type: String,
        enum: ["Received", "Pending"],
    },
    time_placed: Date,
    time_received: Date
});

exports.OrderModel = mongoose.model("Order", orderSchema);
