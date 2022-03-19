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

// GET http://localhost:4000/api/v1/users
router.get("/", getAllUsers);

// GET BY ID http://localhost:4000/api/v1/users/:id
router.get("/:id", getUserById);

// POST http://localhost:4000/api/v1/users
router.post("/", createNewUser);

// PATCH http://localhost:4000/api/v1/users/:id
router.patch("/:id", updateUser);

// DELETE http://localhost:4000/api/v1/users/:id
router.delete("/:id", deleteUser);

module.exports = { usersRouter: router };
