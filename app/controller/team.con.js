const sequelize = require("../config/db");
const team = require("../model/team.model");
const path = require("path");
const fs = require("fs");

const addTeam = async (req, res) => {
  try {
    const { name, designation, content, status } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }

    if (!designation) {
      return res.status(400).json({
        status: false,
        message: "Please provide designation",
      });
    }

    if (!content) {
      return res.status(400).json({
        status: false,
        message: "Please provide content",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please provide image",
      });
    }

    const teamData = await team.create({
      name: name.toUpperCase(),
      designation: designation,
      image: req.file.filename,
      content: content,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Team added successfully",
      data: teamData,
    });
  } catch (error) {
    console.log("addTeam Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllTeam = async (req, res) => {
  try {
    const allTeam = await team.findAll();

    return res.status(200).json({
      status: true,
      message: "Team fetched successfully",
      data: allTeam,
    });
  } catch (error) {
    console.log("getAllTeam Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await team.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Team not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Team fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleTeam Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateTeam = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { name, designation, content, status } = req.body;

    const data = await team.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Team not found",
      });
    }

    const oldImage = data.image;

    const updateData = {
      name: name !== undefined ? name.toUpperCase() : data.name,
      designation: designation !== undefined ? designation : data.designation,
      content: content !== undefined ? content : data.content,
      status: status !== undefined ? status : data.status,
      image: req.file ? req.file.filename : data.image,
    };

    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    if (req.file && oldImage && oldImage !== req.file.filename) {
      const oldImagePath = path.join(__dirname, "../uploads", oldImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Team updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updateTeam Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await team.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Team not found",
      });
    }

    const imageName = data.image;

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    if (imageName) {
      const imagePath = path.join(__dirname, "../uploads", imageName);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteTeam Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
