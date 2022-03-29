// Import Model
const { User } = require("../model/user.model");
const { Review } = require("../model/review.model");
const { Movie } = require("../model/movie.model");

// Import Bcrypt
const bcrypt = require("bcryptjs");

// Import JWT
const jwt = require("jsonwebtoken");

// Import Middlewares
const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

// Import Express-Validator
const { validationResult } = require("express-validator");

// Import Utils
const { filterObj } = require("../utils/filterObj");

// Define the Controllers for users

// Get all the users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "active" },
    include: [{ model: Review, include: [{ model: Movie }] }],
    attributes: { exclude: ["password"] }
  });

  res.status(200).json({
    status: "success",
    data: {
      users
    }
  });
});

// Get the user by Id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

// Create a new user
exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map((err) => err.msg)
      .join(". ");
    return next(new AppError(400, errorMsg));
  }

  const salt = await bcrypt.genSalt(12);

  const passwordCrypt = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: passwordCrypt,
    role
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      newUser
    }
  });
});

// Update the data user
exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const data = filterObj(req.body, "username", "email");

  const updatedUser = await user.update({ ...data });

  res.status(201).json({
    status: "success",
    data: {
      updatedUser
    }
  });
});

// Delete the user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});

// Login the user
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) {
    return next(new AppError(400, "Credentials are invalid"));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: "success",
    data: { token }
  });
});

// Check the token
exports.checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success"
  });
});
