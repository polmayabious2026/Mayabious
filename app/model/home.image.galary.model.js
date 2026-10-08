const { stack } = require("sequelize/lib/utils");
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const homeImageGallery = sequelize.define(
  "homeimagegallery",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // service_category_id: {
    //   type: DataTypes.INTEGER,
    //   // allowNull: false,
    // },
    // service_sub_category_id: {
    //   type: DataTypes.INTEGER,
    //   // allowNull: false,
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    small_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    stack: {
      type: DataTypes.STRING,
      // allowNull: false,
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
    tableName: "homeimagegallery",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const homeGalleryBigImg = sequelize.define(
  "homegallerybigimg",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeimagegallery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    big_image:{
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
    tableName: "homegallerybigimg",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);



module.exports = {homeImageGallery,homeGalleryBigImg };
