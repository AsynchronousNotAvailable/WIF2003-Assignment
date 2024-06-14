const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (cardNumber) {
                return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber);
            },
            message: (props) =>
                `${props.value} is not a valid card number format! Must be in the format "xxxx-xxxx-xxxx-xxxx"`,
        },
    },
    expiryDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (expiryDate) {
                // Regular expression for the format "YYYY-MM-DD"
                return /^\d{4}-\d{2}-\d{2}$/.test(
                    expiryDate.toISOString().slice(0, 10)
                );
            },
            message: (props) =>
                `${props.value} is not a valid expiry date format! Must be in the format "YYYY-MM-DD"`,
        },
    },
    CVV: { type: String, required: true },
    name: { type: String, required: true },
});

exports.CardModel = mongoose.model("Card", cardSchema);
