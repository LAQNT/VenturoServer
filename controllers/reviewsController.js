const ReviewModel = require("../models/ReviewModel");
const TourModel = require("../models/TourModel");

const createReview = async (req, res) => {
  // const tourId = req.params.tourId;
  const newReview = new ReviewModel({ ...req.body, ...{ tourId: tourId } });

  try {
    const savedReview = await newReview.save();

    //save new review on the array reviews of the tour
    await TourModel.findByIdAndUpdate(req.params.tourId, {
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
