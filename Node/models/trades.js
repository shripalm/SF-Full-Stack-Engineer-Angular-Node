// Uncomment the code below to use Sequelize ORM
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
// const mongoose = require('mongoose');


// Insert your model definition below

module.exports = sequelize.define(
  'trades',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: Sequelize.ENUM("buy", "sell"),
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    symbol: {
      type: String,
      allowNull: true
    },
    shares: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    timestamp: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
  },
  {
    timestamps: false
  }
)