const userModel = require("../models/UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User created and registered" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // check password
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    // generate jwt token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.APP_JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.header("authorization", token).status(200).send({
      message: "login effettuato con successo",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

module.exports = { register, login };
