// Import Models
const { Review } = require("../model/review.model");
const { Movie } = require("../model/movie.model");

// Import Middleware
const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

// Import Express-Validator
const { validationResult } = require("express-validator");

// Import Utils
const { filterObj } = require("../utils/filterObj");

// Define the Controllers for movies

// Get all the reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.findAll({
    where: { status: "active" },
    include: [{ model: Movie }]
  });

  res.status(200).json({
    status: "success",
    data: {
      reviews
    }
  });
});

// Get the review by Id
exports.getReviewById = catchAsync(async (req, res, next) => {
  const { review } = req;

  res.status(200).json({
    status: "success",
    data: {
      review
    }
  });
});

// Create a new review
exports.createNewReview = catchAsync(async (req, res, next) => {
  const { title, comments, rating, movieId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map((err) => err.msg)
      .join(". ");
    return next(new AppError(400, errorMsg));
  }

  const newReview = await Review.create({
    title,
    comments,
    rating,
    userId: req.currentUser.id,
    movieId
  });

  res.status(201).json({
    status: "success",
    data: {
      newReview
    }
  });
});

// Update the data review
exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const data = filterObj(req.body, "title", "comments", "rating");

  const updatedReview = await review.update({ ...data });

  res.status(201).json({
    status: "success",
    data: {
      updatedReview
    }
  });
});

// Delete the review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
