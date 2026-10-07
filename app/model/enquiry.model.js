const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const enquiryModel = sequelize.define(
  "enquiry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "enquiry",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
module.exports = enquiryModel;
