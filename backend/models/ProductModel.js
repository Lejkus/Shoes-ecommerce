const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const imagesSchema = mongoose.Schema({
  color: { type: String, required: false },
  images: [{ type: String, required: false }],
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [imagesSchema],
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  colors: {
    type: Array,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 50,
  },
});

module.exports = mongoose.model("Product", productSchema);
