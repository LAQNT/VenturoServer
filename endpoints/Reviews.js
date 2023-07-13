const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
} = require("./../controllers/reviewsController");
const { verifyUser } = require("../utils/verifyToken");

router.post("/:tourId", verifyUser, createReview);
router.get("/:tourId/reviews", getReviews);

module.exports = router;
