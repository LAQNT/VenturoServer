// Import the usersModel
const userModel = require("../models/UserModel");
const express = require("express");

// get all Users
const getUsers = async (req, res, next) => {
  try {
    const Users = await userModel.find();

    res.status(200).json({
      success: true,
      message: "Successful",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to get Users",
    });
  }
};

//  get User by ID
const getUserById = async (req, res, next) => {
  try {
    const User = await userModel.findById(req.params.id);

    if (!User) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to get User",
    });
  }
};

//  new Users
const updateUser = async (req, res, next) => {
  try {
    const User = await userModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "User created",
      data: User,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create User",
    });
  }
};

// delete Users
const deleteUser = async (req, res, next) => {
  try {
    res.status(200).json(await userModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete User",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
