// Import Express
const express = require("express");

// Import Router
const { usersRouter } = require("./routes/users.routes");
const { moviesRouter } = require("./routes/movies.routes");
const { actorsRouter } = require("./routes/actors.routes");

// Init Express
const app = express();

// Enable to receive JSON
app.use(express.json());

// Enable the endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/actors", actorsRouter);

module.exports = { app };
