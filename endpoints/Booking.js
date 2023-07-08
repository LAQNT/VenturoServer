const express = require("express");
const router = express.Router();
const { verifyUser } = require("../utils/verifyToken");
const { createBooking } = require("../controllers/bookingController");

router.post("/", verifyUser, createBooking);

module.exports = router;
