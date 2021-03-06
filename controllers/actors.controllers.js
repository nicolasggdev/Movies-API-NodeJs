const { Actor } = require("../model/actor.model");
const { Movie } = require("../model/movie.model");

const { storage } = require("../database/firebase");

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const { catchAsync } = require("../middleware/catchAsync");
const { AppError } = require("../middleware/appError");

const { validationResult } = require("express-validator");

const { filterObj } = require("../utils/filterObj");

// Get all the actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: "active" },
    include: [{ model: Movie }]
  });

  const actorsPromises = actors.map(
    async ({
      id,
      name,
      country,
      rating,
      age,
      profilePic,
      movies,
      status,
      createdAt,
      updatedAt
    }) => {
      const imgRef = ref(storage, profilePic);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        name,
        country,
        rating,
        age,
        profilePic: imgDownloadUrl,
        movies,
        status,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedActor = await Promise.all(actorsPromises);

  res.status(200).json({
    status: "success",
    data: {
      actors: resolvedActor
    }
  });
});

// Get the actor by Id
exports.getActorById = catchAsync(async (req, res, next) => {
  const { actor } = req;

  const imgRef = ref(storage, actor.profilePic);

  const imgDownloadUrl = await getDownloadURL(imgRef);

  actor.profilePic = imgDownloadUrl;

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
  const { actor } = req;

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
  const { actor } = req;

  await actor.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
