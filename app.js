// Import Express
const express = require("express");

// Import GlobalError Middleware
const { globalErrorHandler } = require("./middleware/error.middleware");

// Import Router
const { usersRouter } = require("./routes/users.routes");
const { moviesRouter } = require("./routes/movies.routes");
const { actorsRouter } = require("./routes/actors.routes");

// Import Utils
const { AppError } = require("./middleware/appError");

// Init Express
const app = express();

// Enable to receive JSON
app.use(express.json());

// Enable to receive Form-Data
app.use(express.urlencoded({ extended: true }));

// Enable the endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/actors", actorsRouter);

// Middleware for page that not found
app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Init GlobalError Middleware
app.use(globalErrorHandler);

module.exports = { app };
