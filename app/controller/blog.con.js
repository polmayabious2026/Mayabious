const blog = require("../model/blog.model");

const path = require("path");
const fs = require("fs");

const createBlog = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { date, heading, title, content, description } = req.body;

    if (!date || !title || !description || !heading) {
      await transaction.rollback();
      return res.status(400).json({
        status: false,
        message: "Date or title or description or heading cant be empty",
      });
    }
    if (!req.file) {
      await transaction.rollback();
      return res.status(400).json({
        status: false,
        message: "Please Provide images",
      });
    }
    const createData = await blog.create({
      date: date,
      heading: heading,
      title: title,
      content: content,
      description: description,
      small_image: req.file.filename,
      big_image: req.file.filename,
    });
    await transaction.commit();
    return res.status(201).json({
      status: true,
      message: "Blog created successfully",
      data: createData,
    });
  } catch (error) {
    await transaction.rollback();
    console.log("createBlog Error:", error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getallBlog = async (req, res) => {
  try {
    const allData = await blog.findAll();
    return res.status(200).json({
      status: true,
      message: "All blog fetched successfully",
      data: allData,
    });
  } catch (error) {
    console.log("GetallBlog Error:", error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getsingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await blog.findByPk(id);
    if (!singleData) {
      res.status(400).json({
        status: false,
        message: "No blog found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog fetched successfully",
      data: singleData,
    });
  } catch (error) {
    console.log("GetsingleBlog Error:", error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateBllog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { date, heading, title, content, description } = req.body;

    const data = await blog.findByPk(id);
    if (!data) {
      await transaction.rollback();
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const oldSmallImage = data.small_image;
    const oldBigImage = data.big_image;

    let updateData = {};
    if (date !== undefined) updateData.date = date;
    if (heading !== undefined) updateData.heading = heading;
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (description !== undefined) updateData.description = description;

    if (req.files?.small_image)
      updateData.small_image = req.files.small_image[0].filename;
    if (req.files?.big_image)
      updateData.big_image = req.files.big_image[0].filename;

    await data.update(updateData, { transaction });

    await transaction.commit();

    // 5. Delete the old images from disk ONLY if a new image replaced them
    const imagesToDelete = [];
    if (updateData.small_image && oldSmallImage)
      imagesToDelete.push(oldSmallImage);
    if (updateData.big_image && oldBigImage) imagesToDelete.push(oldBigImage);

    imagesToDelete.forEach((name) => {
      const imagePath = path.join(__dirname, "../uploads", name);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    return res.status(200).json({
      status: true,
      message: "Blog updated successfully",
      data,
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error("updateBlog Error:", error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await blog.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const imageName = [data.small_image, data.big_image];

    await data.destroy({
      transaction,
    });

    await transaction.commit();
    imageName.forEach((name) => {
      if (name) {
        const imagePath = path.join(__dirname, "../uploads", name);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    });

    return res.status(200).json({
      status: true,
      message: "Award deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteBlog Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getallBlog,
  getsingleBlog,
  updateBllog,
  deleteBlog,
};
