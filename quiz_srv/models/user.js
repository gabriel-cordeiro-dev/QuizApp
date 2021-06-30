const { DataTypes } = require("sequelize");
const conn = require("../db");

const User = conn.define("users", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  pontuacao: DataTypes.INTEGER,
});

module.exports = User;
