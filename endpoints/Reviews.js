const express = require("express");
const router = express.Router();

// Models
const reviewModel = require("../models/ReviewModel");

router.get("/reviews", async (req, res, next) => {
  try {
    res.status(200).json(await reviewModel.find());
  } catch (err) {
    throw new Error("not valid");
  }
});

router.get("/reviews/:id", async (req, res, next) => {
  try {
    res.status(200).json(await reviewModel.findById(req.params.id));
  } catch (err) {
    next();
  }
});

router.post("/reviews", async (req, res, next) => {
  try {
    res.status(201).json(await new reviewModel(req.body).save());
  } catch (err) {
    console.log("Error making POST request");
    next();
  }
});

// router.patch("/reviews/:id", async (req, res, next) => {
//   const tourExist = await reviewModel.findById(req.params.id);
//   if (!tourExist) {
//     return res.status(400).send("non essiste questo tour");
//   }
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };
//     const result = await reviewModel.findByIdAndUpdate(
//       id,
//       updatedData,
//       options
//     );
//     res.status(200).send({
//       message: "tour aggiornato con successo",
//       statusCode: 200,
//       result,
//     });
//   } catch (err) {
//     res.status(500).send("errore interno del server");
//   }
// });

router.delete("/reviews/:id", async (req, res, next) => {
  try {
    res.status(200).json(await reviewModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next();
  }
});

module.exports = router;
