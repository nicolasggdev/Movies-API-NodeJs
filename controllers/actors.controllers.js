// Import Model
const { Actor } = require("../model/actor.model");

// Import Firebase
const { storage } = require("../database/firebase");

// Import firebase methods
const { ref, uploadBytes } = require("firebase/storage");

// Import Middleware
const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

// Import Utils
const { filterObj } = require("../utils/filterObj");

// Define the Controllers for actors

// Get all the actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: {
      actors
    }
  });
});

// Get the actor by Id
exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { status: "active", id } });

  if (!actor) {
    return next(new AppError(404, "Cant find the Actor with the given ID"));
  }

  res.status(200).json({
    status: "success",
    data: {
      actor
    }
  });
});

// Create a new actor
exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age } = req.body;

  if (!name || !country || !rating || !age) {
    return next(new AppError(400, "The properties are not valid"));
  }

  const imgRef = ref(
    storage,
    `actors-imgs/${Date.now()}-${req.file.originalname}`
  );

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic: result.metadata.fullPath
  });

  res.status(201).json({
    status: "success",
    data: {
      newActor
    }
  });
});

// Update the data actor
exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { status: "active", id } });

  if (!actor) {
    return next(new AppError(404, "Cant find the Actor with the given ID"));
  }

  const data = filterObj(req.body, "name", "country", "age");

  const updatedActor = await actor.update({ ...data });

  res.status(201).json({
    status: "success",
    data: {
      updatedActor
    }
  });
});

// Delete the actor
exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { status: "active", id } });

  if (!actor) {
    return next(new AppError(404, "Cant find the Actor with the given ID"));
  }

  await actor.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
