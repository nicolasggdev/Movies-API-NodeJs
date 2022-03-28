// Import Model
const { Actor } = require("../model/actor.model");
const { Movie } = require("../model/movie.model");

// Import Utils
const { AppError } = require("./appError");
const { catchAsync } = require("./catchAsync");

exports.actorsExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { status: "active", id },
    include: [{ model: Movie }]
  });

  if (!actor) {
    return next(new AppError(404, "Cant find the Actor with the given ID"));
  }

  req.actor = actor;

  next();
});
