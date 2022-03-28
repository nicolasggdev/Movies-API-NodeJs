// Import Express
const express = require("express");

// Import Middleware
const { validateSession } = require("../middleware/auth.middleware");

const {
  protectReviewOwner,
  reviewExits
} = require("../middleware/review.middleware");

// Import Express-Validator
const { body } = require("express-validator");

// Import Controllers
const {
  getAllReviews,
  getReviewById,
  createNewReview,
  deleteReview,
  updateReview
} = require("../controllers/review.controllers");

// Init Router
const router = express.Router();

router.use(validateSession);

// Define the Endpoints

router
  .route("/")
  .get(getAllReviews)
  .post(
    [
      body("title")
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Must provide a valid title"),
      body("comments")
        .isString()
        .withMessage("Comments must be a string")
        .notEmpty()
        .withMessage("Must provide a valid comments"),
      body("rating")
        .isNumeric()
        .withMessage("Rating must be a number")
        .custom((value) => value > 0 && value <= 5)
        .withMessage("Rating must be between 1 to 5")
        .notEmpty()
        .withMessage("Must provide a valid rating")
    ],
    createNewReview
  );

router
  .use("/:id", reviewExits)
  .route("/:id")
  .get(getReviewById)
  .patch(protectReviewOwner, updateReview)
  .delete(protectReviewOwner, deleteReview);

module.exports = { reviewsRouter: router };
