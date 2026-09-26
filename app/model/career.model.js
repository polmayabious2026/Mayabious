const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const career = sequelize.define(
  "career",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bannerimage: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "career",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
const jobvacancy = sequelize.define(
  "jobvacancy",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    career_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servicecategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceSubCategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "jobvacancy",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
const value = sequelize.define(
  "value",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    career_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "value",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
const perksbenifit = sequelize.define(
  "perksandbenifit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    career_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "perksandbenifit",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);





module.exports = { career, value, jobvacancy,perksbenifit };
