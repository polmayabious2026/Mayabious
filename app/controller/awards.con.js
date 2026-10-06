const sequelize = require("../config/db");

const awards = require("../model/awards.model");

const path = require("path")
const fs = require("fs")

const addAwards = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, description, date, status } = req.body;

    // let title = req.body.title;

    // if (!Array.isArray(title)) {
    //   title = title ? [title] : [];
    // }
    if (!title || !description || !date) {
      await transaction.rollback();
      return res.status(400).json({
        status: false,
        message: "Please provide all details title description date",
      });
    }

    // if (!description) {
    //   await transaction.rollback();
    //   return res.status(400).json({
    //     status: false,
    //     message: "Please provide description",
    //   });
    // }
    if (!req.file) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }
    // if (
    //   title.length !== req.files.length ||
    //   title.length !== description.length
    // ) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message:
    //       "Number of titles and images and descriptions must be the same",
    //     titleCount: title.length,
    //     imageCount: req.files.length,
    //   });
    // }
    // const upperChaseTitle = title.toUpperCase()

    // const awardsData = title.map((item, index) => ({
    //   title: item.toUpperCase(),
    //   image: req.files[index].filename,
    //   description: description[index],
    //   status: status || "1",
    // }));
    // const data = await awards.bulkCreate(awardsData, {
    //   transaction,
    // });

    const awardsData = await awards.create({
      title: title.toUpperCase(),
      description: description,
      image: req.file.filename,
      date: date,
      status: status || "1",
    });
    await transaction.commit();

    return res.status(201).json({
      status: true,
      message: "Awards added successfully",
      data: awardsData,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("addAwards Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getAwards = async (req, res) => {
  try {
    const data = await awards.findAll({
      //   order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Awards fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAwards Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleAwards = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await awards.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Awards fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllAwards Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateAwards = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { title, description, date, status } = req.body;

    const data = await awards.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Award not found",
      });
    }

    // if (!title) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "Please provide title",
    //   });
    // }

    // if (!description) {
    //   await transaction.rollback();

    //   return res.status(400).json({
    //     status: false,
    //     message: "Please provide description",
    //   });
    // }
    const boldTitle = title ? title.toUpperCase() : data.title;
   
    const oldImage = data.image;

    const imageName = req.file ? req.file.filename : oldImage;

    await data.update(
      {
        title: boldTitle,
        description: description || data.description,
        image: imageName,
        status: status || data.status,
        date: date || data.date,
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    if (req.file && oldImage && oldImage !== imageName) {
      const oldImagePath = path.join(__dirname, "../uploads", oldImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Award updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updateAwards Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteAwards = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await awards.findByPk(id, {
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Award not found",
      });
    }

    const imageName = data.image;

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    if (imageName) {
      const imagePath = path.join(__dirname, "../uploads", imageName);

      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (fileError) {
        console.error("Image deletion error:", fileError);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Award deleted successfully",
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    console.log("deleteAwards Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


module.exports = {
  addAwards,
  getAwards,
  getSingleAwards,
  updateAwards,
  deleteAwards,
};
