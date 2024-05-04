const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    sellers: [{ type: Schema.Types.ObjectId, ref: "Seller", required: true }],
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    payment_date: { type: Date, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", required: true }],
    payment_status: { type: String, enum: ["Paid", "Unpaid"], required: true },
    payment_method: {
        type: String,
        enum: [
            "Online Banking",
            "Credit Card",
            "Debit Card",
            "TNG",
            "Cash On Delivery",
        ],        
        required: true,
    },
    totalTransactionPrice: { type: Number, required: true },
});

exports.TransactionModel = mongoose.model("Transaction", transactionSchema);
