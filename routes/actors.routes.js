// Import Express
const express = require("express");

// Import Controllers
const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require("../controllers/actors.controllers");

// Import Utils
const { upload } = require("../utils/multer");

// Init Router
const router = express.Router();

// Define the Endpoints

// GET http://localhost:4000/api/v1/actors
router.get("/", getAllActors);

// GET BY ID http://localhost:4000/api/v1/actors/:id
router.get("/:id", getActorById);

// POST http://localhost:4000/api/v1/actors
router.post("/", upload.single("actorImg"), createNewActor);

// PATCH http://localhost:4000/api/v1/actors/:id
router.patch("/:id", updateActor);

// DELETE http://localhost:4000/api/v1/actors/:id
router.delete("/:id", deleteActor);

module.exports = { actorsRouter: router };
