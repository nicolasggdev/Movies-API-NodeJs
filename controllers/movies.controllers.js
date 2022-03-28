// Import Models
const { Movie } = require("../model/movie.model");
const { Actor } = require("../model/actor.model");
const { ActorsInMovie } = require("../model/actorsInMovie.model");

// Import Firebase
const { storage } = require("../database/firebase");

// Import firebase methods
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Import Middleware
const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

// Import Express-Validator
const { validationResult } = require("express-validator");

// Import Utils
const { filterObj } = require("../utils/filterObj");

// Define the Controllers for movies

// Get all the movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: "active" },
    include: [{ model: Actor }]
  });

  const moviesPromises = movies.map(
    async ({
      id,
      title,
      description,
      duration,
      rating,
      img,
      genre,
      status,
      createdAt,
      updatedAt
    }) => {
      const imgRef = ref(storage, img);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        title,
        description,
        duration,
        rating,
        img: imgDownloadUrl,
        genre,
        status,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedMovie = await Promise.all(moviesPromises);

  res.status(200).json({
    status: "success",
    data: {
      movies: resolvedMovie
    }
  });
});

// Get the movie by Id
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  const imgRef = ref(storage, movie.img);

  const imgDownloadUrl = await getDownloadURL(imgRef);

  movie.img = imgDownloadUrl;

  res.status(200).json({
    status: "success",
    data: {
      movie
    }
  });
});

// Create a new movie
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map((err) => err.msg)
      .join(". ");
    return next(new AppError(400, errorMsg));
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
    genre,
    actors
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return await ActorsInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(201).json({
    status: "success",
    data: {
      newMovie
    }
  });
});

// Update the data movie
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

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
  const { movie } = req;

  await movie.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
