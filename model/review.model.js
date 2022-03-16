// Import Database
const { database } = require("../utils/database");

// Import Datatypes
const { DataTypes } = require("sequelize");

// Create the model (Columns)

const Review = database.define("review", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  comments: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = { Review };
