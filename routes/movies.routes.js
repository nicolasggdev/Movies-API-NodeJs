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

// Import Utils
const { upload } = require("../utils/multer");

// Init Router
const router = express.Router();

// Define the Endpoints

// GET http://localhost:4000/api/v1/movies
router.get("/", getAllMovies);

// GET BY ID http://localhost:4000/api/v1/movies/:id
router.get("/:id", getMovieById);

// POST http://localhost:4000/api/v1/movies
router.post("/", upload.single("movieImg"), createNewMovie);

// PATCH http://localhost:4000/api/v1/movies/:id
router.patch("/:id", updateMovie);

// DELETE http://localhost:4000/api/v1/movies/:id
router.delete("/:id", deleteMovie);

module.exports = { moviesRouter: router };
