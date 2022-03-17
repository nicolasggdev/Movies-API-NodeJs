// Import Express
const express = require("express");

// Import Controllers
const {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movies.controllers");

// Init Router
const router = express.Router();

// Define the Endpoints

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.post("/", createNewMovie);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = { moviesRouter: router };
