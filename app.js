const express = require("express");

const helmet = require("helmet");

const compression = require("compression");

const rateLimit = require("express-rate-limit");

const { globalErrorHandler } = require("./middleware/error.middleware");

const { usersRouter } = require("./routes/users.routes");
const { moviesRouter } = require("./routes/movies.routes");
const { actorsRouter } = require("./routes/actors.routes");
const { reviewsRouter } = require("./routes/reviews.routes");

const { AppError } = require("./middleware/appError");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

app.use(limiter);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/actors", actorsRouter);
app.use("/api/v1/reviews", reviewsRouter);

app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

app.use(globalErrorHandler);

module.exports = { app };
