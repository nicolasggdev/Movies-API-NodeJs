const { Review } = require("../model/review.model");

const { AppError } = require("./appError");
const { catchAsync } = require("./catchAsync");

exports.reviewExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { status: "active", id } });

  if (!review) {
    return next(new AppError(404, "Cant find the Review with the given ID"));
  }

  req.review = review;

  next();
});

exports.protectReviewOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(new AppError(403, "You cant update others users comments"));
  }

  next();
});
