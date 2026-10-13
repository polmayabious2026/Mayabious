const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const stayconnectedModel = sequelize.define(
  "stayconnected",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "stayconnected",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
module.exports = stayconnectedModel;
