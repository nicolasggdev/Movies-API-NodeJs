// Import Utils
const { catchAsync } = require("../utils/catchAsync");

// Define the Controllers for actors

// Get all the actors
exports.getAllActors = catchAsync((req, res, next) => {});

// Get the actor by Id
exports.getActorById = catchAsync((req, res, next) => {});

// Create a new actor
exports.createNewActor = catchAsync((req, res, next) => {});

// Update the data actor
exports.updateActor = catchAsync((req, res, next) => {});

// Delete the actor
exports.deleteActor = catchAsync((req, res, next) => {});
