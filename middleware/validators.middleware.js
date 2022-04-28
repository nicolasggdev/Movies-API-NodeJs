const { body, validationResult } = require("express-validator");

const { catchAsync } = require("./catchAsync");
const { AppError } = require("./appError");

// Users Validators
exports.createUserValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Must provide a valid username"),
  body("email")
    .isEmail()
    .withMessage("Email must be a string")
    .notEmpty()
    .withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Must provide a valid password"),
  body("role")
    .isString()
    .withMessage("Role must be a string")
    .notEmpty()
    .withMessage("Must provide a valid role")
];

// Actors Validators
exports.createActorsValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Must provide a valid name"),
  body("country")
    .isString()
    .withMessage("Country must be a string")
    .notEmpty()
    .withMessage("Must provide a valid country"),
  body("rating")
    .isNumeric()
    .withMessage("Rating must be a number")
    .custom((value) => value > 0 && value <= 5)
    .withMessage("Rating must be between 1 to 5")
    .notEmpty()
    .withMessage("Must provide a valid rating"),
  body("age")
    .isNumeric()
    .withMessage("Age must be a number")
    .custom((value) => value > 0)
    .withMessage("Age must be a greater than 0")
    .notEmpty()
    .withMessage("Must provide a valid age")
];

// Movies Validators
exports.createMoviesValidator = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Must provide a valid title"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Must provide a valid description"),
  body("duration")
    .isNumeric()
    .withMessage("Duration must be a number")
    .custom((value) => value > 0)
    .withMessage("Duration must be a greater than 0")
    .notEmpty()
    .withMessage("Must provide a valid duration"),
  body("rating")
    .isNumeric()
    .withMessage("Rating must be a number")
    .custom((value) => value > 0 && value <= 5)
    .withMessage("Rating must be between 1 to 5")
    .notEmpty()
    .withMessage("Must provide a valid rating"),
  body("genre")
    .isString()
    .withMessage("Genre must be a string")
    .notEmpty()
    .withMessage("Must provide a valid title"),
  body("actors")
    .isArray({ min: 1 })
    .withMessage("Must provide at least one actor id")
];

// Reviews Validators
exports.createReviewsValidator = [
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
];

exports.validationResult = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map((err) => err.msg)
      .join(". ");
    return next(new AppError(400, errorMsg));
  }

  next();
});
