const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const toursRouter = require("./endpoints/Tours");
const usersRouter = require("./endpoints/Users");
const authRouter = require("./endpoints/Auth");
const reviewsRouter = require("./endpoints/Reviews");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());

app.use(express.json());
app.use(cookieParser());

const debug = require("./middlewares/debug");
app.use(debug.logUrl);

// Middlewares end
app.use(debug.errorHandler);

app.use("/api/v1/tours", toursRouter);
app.use("api/v1/users", usersRouter);
app.use("api/v1/auth", authRouter);
app.use("api/v1/reviews", reviewsRouter);

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
