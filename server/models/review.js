const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number },
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
});

exports.ReviewModel = mongoose.model("Review", reviewSchema);
