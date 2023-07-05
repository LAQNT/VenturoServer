const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// app.use(cookieParser());

const debug = require("./middlewares/debug");
app.use(debug.logUrl);

// Middlewares end
app.use(debug.errorHandler);

const toursRouter = require("./endpoints/Tours");
app.use("/", toursRouter);

// Start Mongoose e Server
mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then((response) => {
    console.log("DB Connected...");
    app.listen(port, async () =>
      console.log("Server listening on port " + port)
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
