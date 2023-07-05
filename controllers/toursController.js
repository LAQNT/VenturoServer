// Import the tourModel
const tourModel = require("../models/TourModel");
const express = require("express");

// get all tours
const getTours = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);

    const tours = await tourModel
      .find()
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

//  get featured tours
const getFeaturedTours = async (req, res, next) => {
  console.log("ima here");
  try {
    const tours = await tourModel.find({ featured: true }).limit(8);

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
    const tour = await tourModel.findById(req.params.id);

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

// Controller function to update a tour
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

// Controller function to delete a tour
const deleteTour = async (req, res, next) => {
  try {
    res.status(200).json(await tourModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next();
  }
};

module.exports = {
  getTours,
  getFeaturedTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
