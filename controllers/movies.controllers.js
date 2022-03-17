// Import Utils
const { catchAsync } = require("../utils/catchAsync");

// Define the Controllers for movies

// Get all the movies
exports.getAllMovies = catchAsync((req, res, next) => {});

// Get the movie by Id
exports.getMovieById = catchAsync((req, res, next) => {});

// Create a new movie
exports.createNewMovie = catchAsync((req, res, next) => {});

// Update the data movie
exports.updateMovie = catchAsync((req, res, next) => {});

// Delete the movie
exports.deleteMovie = catchAsync((req, res, next) => {});
