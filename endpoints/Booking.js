const express = require("express");
const router = express.Router();
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
const {
  createBooking,
  getAllBookings,
  getSingleBooking,
} = require("../controllers/bookingController");

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getSingleBooking);
router.get("/", verifyAdmin, getAllBookings);

module.exports = router;
