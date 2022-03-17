// Import Utils
const { catchAsync } = require("../utils/catchAsync");

// Define the Controllers for users

// Get all the users
exports.getAllUsers = catchAsync((req, res, next) => {});

// Get the user by Id
exports.getUserById = catchAsync((req, res, next) => {});

// Create a new user
exports.createNewUser = catchAsync((req, res, next) => {});

// Update the data user
exports.updateUser = catchAsync((req, res, next) => {});

// Delete the user
exports.deleteUser = catchAsync((req, res, next) => {});
