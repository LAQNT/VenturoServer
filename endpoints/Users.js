const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

router.get("/", verifyAdmin, getUsers);
// router.get("/", createtUser);
router.get("/:id", verifyUser, getUserById);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
