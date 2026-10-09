const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const homeVideo = sequelize.define(
  "homevideo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
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
    tableName: "homevideo",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
1;

const homeVideoSet = sequelize.define(
  "homevideoset",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
    tableName: "homevideoset",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const homeVideo_nhomeVideoSet = sequelize.define(
  "homevideo_nhomevideoSet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homevideo_id: {
      type: DataTypes.INTEGER,
    },
    homevideoset_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "homevideo_nhomevideoSet",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = { homeVideo, homeVideoSet, homeVideo_nhomeVideoSet };
