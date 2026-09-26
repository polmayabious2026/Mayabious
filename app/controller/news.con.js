const sequelize = require("../config/db");

const news = require("../model/news.model");
const path = require("path");
const fs = require("fs");


const addNews = async (req, res) => {
  try {
    const { channel_name, description, date, status } = req.body;

    if (!channel_name) {
      return res.status(400).json({
        status: false,
        message: "Please provide channel name",
      });
    }

    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    if (!date) {
      return res.status(400).json({
        status: false,
        message: "Please provide date",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please provide image",
      });
    }

    const newsData = await news.create({
      channel_name:channel_name,
      description:description,
      image: req.file.filename,
      date:date,
      status: status || "1",
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
    const { channel_name, description, date, status } = req.body;

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

    if (channel_name !== undefined) {
      updateData.channel_name = channel_name;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (date !== undefined) {
      updateData.date = date;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    // Update image only if new image is uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    // Delete old image after successful database update
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
