const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  featured: {
    type: Number,
    required: true,
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.model("Tour", TourSchema);

module.exports = userModel;
