// Import Express
const express = require("express");

// Import Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser
} = require("../controllers/users.controllers");

// Init Router
const router = express.Router();

// Define the Endpoints

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createNewUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = { usersRouter: router };
