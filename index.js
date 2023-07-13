const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const toursRouter = require("./endpoints/Tours");
const usersRouter = require("./endpoints/Users");
const authRouter = require("./endpoints/Auth");
const reviewsRouter = require("./endpoints/Reviews");
const bookingRouter = require("./endpoints/Booking");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: true,
  credentials: true,
};
// Middlewares
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const debug = require("./middlewares/debug");
app.use(debug.logUrl);

// Middlewares end
app.use(debug.errorHandler);

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/review", reviewsRouter);
app.use("/api/v1/booking", bookingRouter);

// Start Mongoose e Server
mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then((response) => {
    console.log("MongoDB Connected...");
    app.listen(port, async () =>
      console.log("Server listening on port " + port)
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
