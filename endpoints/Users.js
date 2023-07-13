const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const { verifyUser } = require("../utils/verifyToken");

router.get("/", getUsers);
router.get("/:id", verifyUser, getUserById);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
