// Import Models
const { Movie } = require("../model/movie.model");

// Import Firebase
const { storage } = require("../database/firebase");

// Import firebase methods
const { ref, uploadBytes } = require("firebase/storage");

// Import Middleware
const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

// Import Utils
const { filterObj } = require("../utils/filterObj");

// Define the Controllers for movies

// Get all the movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: {
      movies
    }
  });
});

// Get the movie by Id
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { status: "active", id } });

  if (!movie) {
    return next(new AppError(404, "Cant find the Movie with the given ID"));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie
    }
  });
});

// Create a new movie
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre } = req.body;

  if (!title || !description || !duration || !rating || !genre) {
    return next(new AppError(400, "The properties are not valid"));
  }

  const imgRef = ref(
    storage,
    `movies-imgs/${Date.now()}-${req.file.originalname}`
  );

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    img: result.metadata.fullPath,
    genre
  });

  res.status(201).json({
    status: "success",
    data: {
      newMovie
    }
  });
});

// Update the data movie
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { status: "active", id } });

  if (!movie) {
    return next(new AppError(404, "Cant find the Movie with the given ID"));
  }

  const data = filterObj(req.body, "title", "description", "duration", "genre");

  const updatedMovie = await movie.update({ ...data });

  res.status(201).json({
    status: "success",
    data: {
      updatedMovie
    }
  });
});

// Delete the movie
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { status: "active", id } });

  if (!movie) {
    return next(new AppError(404, "Cant find the Movie with the given ID"));
  }

  await movie.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
