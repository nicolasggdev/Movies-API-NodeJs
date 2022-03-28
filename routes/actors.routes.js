// Import Express
const express = require("express");

// Import Express-Validator
const { body } = require("express-validator");

// Import Middleware
const {
  validateSession,
  protectAdmin
} = require("../middleware/auth.middleware");

const { actorsExits } = require("../middleware/actors.middleware");

// Import Controllers
const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require("../controllers/actors.controllers");

// Import Utils
const { upload } = require("../utils/multer");

// Init Router
const router = express.Router();

router.use(validateSession);

// Define the Endpoints

router
  .route("/")
  .get(getAllActors)
  .post(
    upload.single("actorImg"),
    [
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
    ],
    protectAdmin,
    createNewActor
  );

router
  .use("/:id", actorsExits)
  .route("/:id")
  .get(getActorById)
  .patch(protectAdmin, updateActor)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
