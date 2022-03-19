// Import Model
const { User } = require("../model/user.model");

// Import Bcrypt
const bcrypt = require("bcryptjs");

// Import Middlewares
const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

// Import Utils
const { filterObj } = require("../utils/filterObj");

// Define the Controllers for users

// Get all the users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "active" },
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
  const { id } = req.params;

  const user = await User.findOne({
    where: { status: "active", id },
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return next(new AppError(404, "Cant find the User with the given ID"));
  }

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

// Create a new user
exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError(400, "The properties are not valid"));
  }

  const salt = await bcrypt.genSalt(12);

  const passwordCrypt = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: passwordCrypt
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
  const { id } = req.params;

  const user = await User.findOne({
    where: { status: "active", id },
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return next(new AppError(404, "Cant find the User with the given ID"));
  }

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
  const { id } = req.params;

  const user = await User.findOne({
    where: { status: "active", id },
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return next(new AppError(404, "Cant find the User with the given ID"));
  }

  await user.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
