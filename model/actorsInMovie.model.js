// Import Database
const { database } = require("../utils/database");

// Import Datatypes
const { DataTypes } = require("sequelize");

// Create the model (Columns)

const actorsInMovie = database.define("actorsInMovie", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { actorsInMovie };
