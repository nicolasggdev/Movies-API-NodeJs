// Import Database
const { database } = require("../utils/database");

// Import Datatypes
const { DataTypes } = require("sequelize");

// Create the model (Columns)

const User = database.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "guest"
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = { User };
