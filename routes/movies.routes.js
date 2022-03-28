// Import Express
const express = require("express");

// Import Middleware
const {
  validateSession,
  protectAdmin
} = require("../middleware/auth.middleware");

const { movieExits } = require("../middleware/movie.middleware");

// Import Express-Validator
const { body } = require("express-validator");

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

router.use(validateSession);

// Define the Endpoints

router
  .route("/")
  .get(getAllMovies)
  .post(
    upload.single("movieImg"),
    [
      body("title")
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Must provide a valid title"),
      body("description")
        .isString()
        .withMessage("Description must be a string")
        .notEmpty()
        .withMessage("Must provide a valid description"),
      body("duration")
        .isNumeric()
        .withMessage("Duration must be a number")
        .custom((value) => value > 0)
        .withMessage("Duration must be a greater than 0")
        .notEmpty()
        .withMessage("Must provide a valid duration"),
      body("rating")
        .isNumeric()
        .withMessage("Rating must be a number")
        .custom((value) => value > 0 && value <= 5)
        .withMessage("Rating must be between 1 to 5")
        .notEmpty()
        .withMessage("Must provide a valid rating"),
      body("genre")
        .isString()
        .withMessage("Genre must be a string")
        .notEmpty()
        .withMessage("Must provide a valid title"),
      body("actors")
        .isArray({ min: 1 })
        .withMessage("Must provide at least one actor id")
    ],
    protectAdmin,
    createNewMovie
  );

router
  .use("/:id", movieExits)
  .route("/:id")
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

module.exports = { moviesRouter: router };
