const express = require("express");
const router = express.Router();
const {
  getTours,
  getFeaturedTours,
  getToursCount,
  getTourById,
  getTourBySearch,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/toursController");

const { verifyAdmin } = require("../utils/verifyToken");

router.get("/", getTours);
router.get("/:id", getTourById);
router.get("/search/featuredTours", getFeaturedTours);
router.get("/search/getToursCount", getToursCount);
router.get("/search/searchTour", getTourBySearch);
router.post("/", verifyAdmin, createTour);
router.patch("/:id", verifyAdmin, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);

module.exports = router;
