const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    country: { type: String, default: '' },
    receiverName: { type: String, default: '' },
    receiverPhoneNumber: { type: String, default: '' },
});

const customerSchema = new Schema({
    username: { type: String, required: true, maxLength: 100, unique: true },
    email: { type: String, required: true, maxLength: 100, unique: true },
    firstName: { type: String, required: true, maxLength: 100, unique: true },
    lastName: { type: String, required: true, maxLength: 100, unique: true },
    password: { type: String, required: true, maxLength: 100 },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    shippingAddress: addressSchema,
});

exports.CustomerModel = mongoose.model("Customer", customerSchema);


