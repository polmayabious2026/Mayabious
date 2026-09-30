const sequelize = require("../config/db");
const team = require("../model/team.model");
const path = require("path");
const fs = require("fs");

const addTeam = async (req, res) => {
  try {
    const {
      name,
      designation,
      content,
      status,
      facebook,
      linkedin,
      twitter,
      instagram,
    } = req.body;

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
      name: name.trim().toUpperCase(),
      designation: designation.trim(),
      image: req.file.filename,
      content: content.trim(),
      status: status || "1",
      facebook: facebook?.trim() || null,
      linkedin: linkedin?.trim() || null,
      twitter: twitter?.trim() || null,
      instagram: instagram?.trim() || null,
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
    const {
      name,
      designation,
      content,
      status,
      facebook,
      linkedin,
      twitter,
      instagram,
    } = req.body;

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
      name: name !== undefined ? name.trim().toUpperCase() : data.name,

      designation:
        designation !== undefined ? designation.trim() : data.designation,

      content: content !== undefined ? content.trim() : data.content,

      status: status !== undefined ? status : data.status,

      image: req.file ? req.file.filename : data.image,

      facebook:
        facebook !== undefined ? facebook.trim() || null : data.facebook,

      linkedin:
        linkedin !== undefined ? linkedin.trim() || null : data.linkedin,

      twitter: twitter !== undefined ? twitter.trim() || null : data.twitter,

      instagram:
        instagram !== undefined ? instagram.trim() || null : data.instagram,
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
