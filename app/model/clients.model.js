const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const clients = sequelize.define(
  "clients",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position:{
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      comment: "1 = active, 0 = inactive",
      defaultValue: "1",
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = clients;
