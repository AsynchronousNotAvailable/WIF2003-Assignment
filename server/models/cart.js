const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cartItem: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number },
        },
    ],
    default: {},
});

exports.CartModel = mongoose.model("Cart", cartSchema);
