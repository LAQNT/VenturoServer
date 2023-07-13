const ReviewModel = require("../models/ReviewModel");
const TourModel = require("../models/TourModel");

const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new ReviewModel({ ...req.body });
  console.log("here");

  try {
    const savedReview = await newReview.save();

    //save new review on the array reviews of the tour
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

const getReviews = async (req, res) => {
  const tourId = req.params.tourId;

  try {
    const reviews = await ReviewModel.find({ tourId });
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};

module.exports = { createReview, getReviews };
