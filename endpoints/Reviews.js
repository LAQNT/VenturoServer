const express = require("express");
const router = express.Router();
const { createReview } = require("./../controllers/reviewsController");

router.post("/:tourId", createReview);
module.exports = router;
