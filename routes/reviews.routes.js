const express = require("express");

const { validateSession } = require("../middleware/auth.middleware");

const {
  protectReviewOwner,
  reviewExits
} = require("../middleware/review.middleware");

const {
  createReviewsValidator,
  validationResult
} = require("../middleware/validators.middleware");

const {
  getAllReviews,
  getReviewById,
  createNewReview,
  deleteReview,
  updateReview
} = require("../controllers/review.controllers");

const router = express.Router();

router.use(validateSession);

router
  .route("/")
  .get(getAllReviews)
  .post(createReviewsValidator, validationResult, createNewReview);

router
  .use("/:id", reviewExits)
  .route("/:id")
  .get(getReviewById)
  .patch(protectReviewOwner, updateReview)
  .delete(protectReviewOwner, deleteReview);

module.exports = { reviewsRouter: router };
