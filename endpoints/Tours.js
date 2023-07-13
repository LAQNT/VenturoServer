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

// const { verifyAdmin } = require("../utils/verifyToken");

router.get("/", getTours);
router.get("/:id", getTourById);
router.get("/search/featuredTours", getFeaturedTours);
router.get("/search/getToursCount", getToursCount);
router.get("/search/searchTour", getTourBySearch);
router.post("/", createTour);
router.patch("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
