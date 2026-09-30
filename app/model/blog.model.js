const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const blogModel = sequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    small_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    big_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    popular_blogs: {
      type: DataTypes.STRING,
      comment: "1 = yes,0 = no",
      defaultValue: "0",
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "blog",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

const blogcategory = sequelize.define(
  "blogcategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
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
    tableName: "blogcategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
const blognblogcategory = sequelize.define(
  "blognblogcategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    blogcategory_id: {
      type: DataTypes.INTEGER,
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
    tableName: "blognblogcategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = { blogModel, blogcategory, blognblogcategory };
