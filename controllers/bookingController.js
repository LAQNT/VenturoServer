const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Tour successfuly booked",
      data: savedBooking,
    });
  } catch (error) {}
  res.status(500).json({
    success: true,
    message: "Internal server error",
  });
};

module.exports = { createBooking };
