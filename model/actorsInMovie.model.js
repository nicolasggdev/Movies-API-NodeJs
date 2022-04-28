const { database } = require("../database/database");

const { DataTypes } = require("sequelize");

const ActorsInMovie = database.define("actorsInMovie", {
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

module.exports = { ActorsInMovie };
