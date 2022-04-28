const express = require("express");

const {
  validateSession,
  protectAdmin
} = require("../middleware/auth.middleware");

const { actorsExits } = require("../middleware/actors.middleware");

const {
  createActorsValidator,
  validationResult
} = require("../middleware/validators.middleware");

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require("../controllers/actors.controllers");

const { upload } = require("../utils/multer");

const router = express.Router();

router.use(validateSession);

router
  .route("/")
  .get(getAllActors)
  .post(
    protectAdmin,
    upload.single("actorImg"),
    createActorsValidator,
    validationResult,
    createNewActor
  );

router
  .use("/:id", actorsExits)
  .route("/:id")
  .get(getActorById)
  .patch(protectAdmin, updateActor)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
