const express = require("express");

const {
  validateSession,
  protectAdmin
} = require("../middleware/auth.middleware");

const { movieExits } = require("../middleware/movie.middleware");

const {
  createMoviesValidator,
  validationResult
} = require("../middleware/validators.middleware");

const {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movies.controllers");

const { upload } = require("../utils/multer");

const router = express.Router();

router.use(validateSession);

router
  .route("/")
  .get(getAllMovies)
  .post(
    protectAdmin,
    upload.single("movieImg"),
    createMoviesValidator,
    validationResult,
    createNewMovie
  );

router
  .use("/:id", movieExits)
  .route("/:id")
  .get(getMovieById)
  .patch(protectAdmin, updateMovie)
  .delete(protectAdmin, deleteMovie);

module.exports = { moviesRouter: router };
