const { Review } = require("../model/review.model");
const { Movie } = require("../model/movie.model");

const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

const { validationResult } = require("express-validator");

const { filterObj } = require("../utils/filterObj");

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
