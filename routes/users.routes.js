// Import Express
const express = require("express");

// Import Express-Validator
const { body } = require("express-validator");

// Import Middleware
const {
  validateSession,
  protectAdmin
} = require("../middleware/auth.middleware");

const {
  protectAccountOwner,
  userExist
} = require("../middleware/users.middleware");

// Import Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser,
  checkToken
} = require("../controllers/users.controllers");

// Init Router
const router = express.Router();

// Define the Endpoints

router.post(
  "/",
  [
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
  ],
  createNewUser
);

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
