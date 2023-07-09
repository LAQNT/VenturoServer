const bookingModel = require("../models/BookingModel");

const createBooking = async (req, res) => {
  const newBooking = new bookingModel(req.body);
  try {
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Tour successfuly booked",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSingleBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await bookingModel.findById(id);

    res.status(200).json({
      success: true,
      message: "successful",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "not found" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();

    res.status(200).json({
      success: true,
      message: "successful",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports = { createBooking, getAllBookings, getSingleBooking };
