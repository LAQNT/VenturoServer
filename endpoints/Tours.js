// // Models
// const tourModel = require("../models/TourModel");

// router.get("/tours", async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page);

//     const tours = await tourModel
//       .find()
//       .skip(page * 8)
//       .limit(8);

//     res.status(200).json({
//       success: true,
//       count: tours.length,
//       message: "Successful",
//       data: tours,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch tours",
//     });
//   }
// });

// router.get("/featuredTours", async (req, res, next) => {
//   try {
//     const tours = await tourModel.find({ featured: true }).limit(8);

//     res.status(200).json({
//       success: true,
//       count: tours.length,
//       message: "Successful",
//       data: tours,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch tours",
//     });
//   }
// });

// router.get("/search/getTourBySearch", async (req, res) => {
//   const { address, maxDistance, numberOfPeople } = req.query;

//   const filter = {};

//   if (address) {
//     filter.address = { $regex: new RegExp(`^${address}$`, "i") };
//   }

//   if (maxDistance) {
//     filter.distance = { $lte: parseInt(maxDistance) };
//   }

//   if (numberOfPeople) {
//     filter.numberOfPeople = { $gte: parseInt(numberOfPeople) };
//   }

//   try {
//     const tours = await tourModel.find(filter);

//     res.status(200).json({
//       success: true,
//       count: tours.length,
//       message: "Successful",
//       data: tours,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(404).json({
//       success: false,
//       message: "not found",
//     });
//   }
// });

// router.get("/tours/:id", async (req, res, next) => {
//   try {
//     res.status(200).json(await tourModel.findById(req.params.id));
//   } catch (err) {
//     next();
//   }
// });

// router.post("/tours", async (req, res, next) => {
//   try {
//     res.status(201).json(await new tourModel(req.body).save());
//   } catch (err) {
//     console.log("Error making POST request");
//     next();
//   }
// });

// router.patch("/tours/:id", async (req, res, next) => {
//   const tourExist = await tourModel.findById(req.params.id);
//   if (!tourExist) {
//     return res.status(400).send("non essiste questo tour");
//   }
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };
//     const result = await tourModel.findByIdAndUpdate(id, updatedData, options);
//     res.status(200).send({
//       message: "tour aggiornato con successo",
//       statusCode: 200,
//       result,
//     });
//   } catch (err) {
//     res.status(500).send("errore interno del server");
//   }
// });

// router.delete("/tours/:id", async (req, res, next) => {
//   try {
//     res.status(200).json(await tourModel.findByIdAndDelete(req.params.id));
//   } catch (err) {
//     next();
//   }
// });

// router.get("/search/tourCount", async (req, res, next) => {
//   try {
//     const tourCount = await tourModel.estimatedDocumentCount();
//     res.status(200).json({ success: true, data: tourCount });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "failed to fetch" });
//   }
// });
// module.exports = router;
const express = require("express");
const router = express.Router();
const toursController = require("../controllers/toursController");

router.get("/tours", toursController.getTours);
router.get("/featuredTours", toursController.getFeaturedTours);
router.get("/tours/:id", toursController.getTourById);
router.post("/tours", toursController.createTour);
router.patch("/tours/:id", toursController.updateTour);
router.delete("/tours/:id", toursController.deleteTour);
// const {
//   getTours,
//   getFeaturedTours,
//   getTourById,
//   createTour,
//   updateTour,
//   deleteTour,
// } = require("../controllers/toursController");

// const searchController = require("../controllers/searchController");

// router.get("/tours", getTours);

// router.get("/featuredTours", getFeaturedTours);

// router.get("/search/getTourBySearch", searchController.getTourBySearch);

// router.get("/tours/:id", getTourById);

// router.post("/tours", createTour);

// router.patch("/tours/:id", updateTour);

// router.delete("/tours/:id", deleteTour);

// router.get("/search/tourCount", searchController.getTourCount);

module.exports = router;
