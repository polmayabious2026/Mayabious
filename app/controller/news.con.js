const sequelize = require("../config/db");

const news = require("../model/news.model");
const path = require("path");
const fs = require("fs");

const addNews = async (req, res) => {
  try {
    const { channel_name, description, date, status, type, url } = req.body;

    // Channel name
    if (!channel_name?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide channel name",
      });
    }

    // Description
    if (!description?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    // Date
    if (!date?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide date",
      });
    }

    // URL
    if (!url?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide URL",
      });
    }

    // Image
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please provide image",
      });
    }

    const newsData = await news.create({
      channel_name: channel_name.trim().toUpperCase(),
      description: description.trim().toUpperCase(),
      image: req.file.filename,
      date: date.trim(),
      status: status || "1",
      type: type || "1",
      url: url.trim(),
    });

    return res.status(201).json({
      status: true,
      message: "News added successfully",
      data: newsData,
    });
  } catch (error) {
    console.log("addNews Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllNews = async (req, res) => {
  try {
    const allNews = await news.findAll();

    return res.status(200).json({
      status: true,
      message: "News fetched successfully",
      data: allNews,
    });
  } catch (error) {
    console.log("getAllNews Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await news.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "News fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleNews Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const { channel_name, description, date, status, type, url } = req.body;

    const data = await news.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    const oldImage = data.image;

    const updateData = {};

    // Channel name
    if (channel_name !== undefined) {
      if (!channel_name.trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Channel name cannot be empty",
        });
      }

      updateData.channel_name = channel_name.trim().toUpperCase();
    }

    // Description
    if (description !== undefined) {
      if (!description.trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Description cannot be empty",
        });
      }

      updateData.description = description.trim().toUpperCase();
    }

    // Date
    if (date !== undefined) {
      if (!date.trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Date cannot be empty",
        });
      }

      updateData.date = date.trim();
    }

    // URL
    if (url !== undefined) {
      if (!url.trim()) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "URL cannot be empty",
        });
      }

      updateData.url = url.trim();
    }

    // Status
    if (status !== undefined) {
      if (!["0", "1"].includes(String(status))) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Status must be 0 or 1",
        });
      }

      updateData.status = String(status);
    }

    // Type
    if (type !== undefined) {
      if (!["0", "1"].includes(String(type))) {
        await transaction.rollback();

        return res.status(400).json({
          status: false,
          message: "Type must be 0 (Print Media) or 1 (Digital Media)",
        });
      }

      updateData.type = String(type);
    }

    // Image
    if (req.file) {
      updateData.image = req.file.filename;
    }

    // Update database
    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    // Delete old image only after successful database update
    if (req.file && oldImage && oldImage !== req.file.filename) {
      const oldImagePath = path.join(__dirname, "../uploads", oldImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "News updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updateNews Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await news.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    const imageName = data.image;

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    // Delete image from uploads folder
    if (imageName) {
      const imagePath = path.join(__dirname, "../uploads", imageName);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteNews Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
};
