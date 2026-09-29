const sequelize = require("../config/db");

const blog = require("../model/blog.model");

const path = require("path");
const fs = require("fs");

const createBlog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { date, heading, title, content, description } = req.body;

    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);

    if (!date) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide date",
      });
    }

    if (!heading) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide heading",
      });
    }

    if (!title) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    if (!description) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }
    if (!req.files || !req.files.small_image || !req.files.small_image.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide small image",
      });
    }
    if (!req.files || !req.files.big_image || !req.files.big_image.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide big image",
      });
    }

    const smallImage = req.files.small_image[0];
    const bigImage = req.files.big_image[0];

    const createData = await blog.create(
      {
        date,
        heading: heading.toUpperCase(),
        title: title.toUpperCase(),
        content: content || null,
        description,

        small_image: smallImage.filename,
        big_image: bigImage.filename,
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    return res.status(201).json({
      status: true,
      message: "Blog created successfully",
      data: createData,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("createBlog Error:", error);

    return res.status(500).json({
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
const updateBlog = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const { date, heading, title, content, description } = req.body;

    const data = await blog.findByPk(id, {
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const oldSmallImage = data.small_image;
    const oldBigImage = data.big_image;

    const updateData = {};

    if (date !== undefined) {
      updateData.date = date;
    }

    if (heading !== undefined) {
      updateData.heading = heading.toUpperCase();
    }

    if (title !== undefined) {
      updateData.title = title.toUpperCase();
    }

    if (content !== undefined) {
      updateData.content = content;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (
      req.files &&
      req.files.small_image &&
      req.files.small_image.length > 0
    ) {
      updateData.small_image = req.files.small_image[0].filename;
    }

    if (req.files && req.files.big_image && req.files.big_image.length > 0) {
      updateData.big_image = req.files.big_image[0].filename;
    }

    if (!Object.keys(updateData).length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    if (
      updateData.small_image &&
      oldSmallImage &&
      oldSmallImage !== updateData.small_image
    ) {
      const oldSmallImagePath = path.join(
        __dirname,
        "../uploads",
        oldSmallImage,
      );

      if (fs.existsSync(oldSmallImagePath)) {
        fs.unlinkSync(oldSmallImagePath);
      }
    }

    if (
      updateData.big_image &&
      oldBigImage &&
      oldBigImage !== updateData.big_image
    ) {
      const oldBigImagePath = path.join(__dirname, "../uploads", oldBigImage);

      if (fs.existsSync(oldBigImagePath)) {
        fs.unlinkSync(oldBigImagePath);
      }
    }

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

    return res.status(500).json({
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

    const data = await blog.findByPk(id, {
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    const smallImage = data.small_image;
    const bigImage = data.big_image;

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    if (smallImage) {
      const smallImagePath = path.join(__dirname, "../uploads", smallImage);

      if (fs.existsSync(smallImagePath)) {
        fs.unlinkSync(smallImagePath);
      }
    }

    if (bigImage) {
      const bigImagePath = path.join(__dirname, "../uploads", bigImage);

      if (fs.existsSync(bigImagePath)) {
        fs.unlinkSync(bigImagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("deleteBlog Error:", error);

    return res.status(500).json({
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
  updateBlog,
  deleteBlog,
};
