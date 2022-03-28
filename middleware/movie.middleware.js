// Import Model
const { Movie } = require("../model/movie.model");

// Import Utils
const { AppError } = require("./appError");
const { catchAsync } = require("./catchAsync");

exports.movieExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { status: "active", id } });

  if (!movie) {
    return next(new AppError(404, "Cant find the Movie with the given ID"));
  }

  req.movie = movie;

  next();
});
