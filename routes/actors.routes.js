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

// Init Router
const router = express.Router();

// Define the Endpoints

router.get("/", getAllActors);

router.get("/:id", getActorById);

router.post("/", createNewActor);

router.patch("/:id", updateActor);

router.delete("/:id", deleteActor);

module.exports = { actorsRouter: router };
