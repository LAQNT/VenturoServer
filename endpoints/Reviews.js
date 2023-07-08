const express = require("express");
const router = express.Router();
const { createReview } = require("./../controllers/reviewsController");
const { verifyUser } = require("../utils/verifyToken");

router.post("/:tourId", verifyUser, createReview);

module.exports = router;
