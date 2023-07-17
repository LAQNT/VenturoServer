// Import the tourModel
const tourModel = require("../models/TourModel");
const express = require("express");

// get all tours
const getAllTours = async (req, res, next) => {
  try {
    const tours = await tourModel.find().populate("reviews");

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
    });
  }
};

const getTours = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);

    const tours = await tourModel
      .find()
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
    });
  }
};

//  get featured/best deal tours
const getFeaturedTours = async (req, res, next) => {
  try {
    const tours = await tourModel
      .find({ bestDeal: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours",
    });
  }
};

//  get tour by ID
const getTourById = async (req, res, next) => {
  try {
    const tour = await tourModel.findById(req.params.id).populate("reviews");

    if (!tour) {
      res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour found",
      data: tour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour",
    });
  }
};

//  new tour
const createTour = async (req, res, next) => {
  try {
    const tour = await tourModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tour created",
      data: tour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create tour",
    });
  }
};

//  update a tour
const updateTour = async (req, res, next) => {
  const tourExist = await tourModel.findById(req.params.id);
  if (!tourExist) {
    return res.status(400).send("non esiste questo tour");
  }
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await tourModel.findByIdAndUpdate(id, updatedData, options);
    res.status(200).send({
      message: "tour aggiornato con successo",
      statusCode: 200,
      result,
    });
  } catch (err) {
    res.status(500).send("errore interno del server");
  }
};

// delete tour
const deleteTour = async (req, res, next) => {
  try {
    res.status(200).json(await tourModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next();
  }
};

// get tours count
const getToursCount = async (req, res) => {
  try {
    const tourCount = await tourModel.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res
      .status(500)
      .json({ success: CSSFontFeatureValuesRule, message: "failed to fetch" });
  }
};

// search
const getTourBySearch = async (req, res) => {
  const country = new RegExp(req.query.country, "i");
  const maxDistance = parseInt(req.query.distance);
  const numberOfPeople = parseInt(req.query.numberOfPeople);

  try {
    const tours = await tourModel
      .find({
        country,
        distance: { $lte: maxDistance },
        numberOfPeople: { $gte: numberOfPeople },
      })
      .populate("reviews");

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

module.exports = {
  getTours,
  getAllTours,
  getFeaturedTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getToursCount,
  getTourBySearch,
};
