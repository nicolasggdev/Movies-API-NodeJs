// Import Express
const express = require("express");

// Init Express
const app = express();

// Enable to receive JSON
app.use(express.json());

module.exports = { app };
