const express = require("express");
const router = express.Router();
const { verifyUser } = require("../utils/verifyToken");
const {
  createBooking,
  getAllBookings,
  getSingleBooking,
} = require("../controllers/bookingController");

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getSingleBooking);
router.get("/", getAllBookings);

module.exports = router;
