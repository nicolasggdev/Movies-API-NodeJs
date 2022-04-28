const express = require("express");

const {
  validateSession,
  protectAdmin
} = require("../middleware/auth.middleware");

const {
  protectAccountOwner,
  userExist
} = require("../middleware/users.middleware");

const {
  createUserValidator,
  validationResult
} = require("../middleware/validators.middleware");

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser,
  checkToken
} = require("../controllers/users.controllers");

const router = express.Router();

router.post("/", createUserValidator, validationResult, createNewUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/check-token", checkToken);

router.get("/", protectAdmin, getAllUsers);

router
  .use("/:id", userExist)
  .route("/:id")
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
