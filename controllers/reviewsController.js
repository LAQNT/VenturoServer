const ReviewModel = require("../models/ReviewModel");
const TourModel = require("../models/TourModel");

const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new ReviewModel({ ...req.body });

  try {
    const savedReview = await newReview.save();

    await TourModel.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    return res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to submit review" });
  }
};

module.exports = { createReview };
