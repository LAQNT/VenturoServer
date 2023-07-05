const tourModel = require("../models/TourModel");

const getTourBySearch = async (req, res) => {
  const { address, maxDistance, numberOfPeople } = req.query;

  const filter = {};

  if (address) {
    filter.address = { $regex: new RegExp(`^${address}$`, "i") };
  }

  if (maxDistance) {
    filter.distance = { $lte: parseInt(maxDistance) };
  }

  if (numberOfPeople) {
    filter.numberOfPeople = { $gte: parseInt(numberOfPeople) };
  }

  try {
    const tours = await tourModel.find(filter);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// Export the controller function
module.exports = {
  getTourBySearch,
};
