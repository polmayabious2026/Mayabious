const homeImageGallery = require("../model/home.image.galary.model");
const servicecategory = require("../model/service.categoty.model");
const serviceSubCategory = require("../model/service.subcategory.model");

const createHomeImageGallery = async (req, res) => {
  try {
    const { service_category_id, service_sub_category_id, title } = req.body;

    if (!service_category_id || !service_sub_category_id || !title) {
      return res.status(400).json({
        status: false,
        message:
          "service_category_id, service_sub_category_id and title are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Image is required",
      });
    }
    const checkcategory = await servicecategory.findByPk(service_category_id);
    if (!checkcategory) {
      return res.status(400).json({
        status: false,
        message: "Category not found",
      });
    }
    const checksubcategorypresentincategory = await serviceSubCategory.findOne({
      where: {
        service_category_id: service_category_id,
      },
    });
    if (!checksubcategorypresentincategory) {
      return res.status(400).json({
        status: false,
        message: "Sub_category is not present in this category",
      });
    }
    const bold_title = title.toUpperCase();
    const image = req.file.filename;

    const data = await homeImageGallery.create({
      service_category_id,
      service_sub_category_id,
      title: bold_title,
      image,
      status: "1",
    });

    return res.status(201).json({
      status: true,
      message: "Home image gallery created successfully",
      data,
    });
  } catch (error) {
    console.log("Home image gallery create:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getHomeImageGallery = async (req, res) => {
  try {
    const data = await homeImageGallery.findAll({
      attributes:["id","title","image"],
      include: [
        {
          model: servicecategory,
          as: "category",
          attributes:["id","name"]
        },
        {
          model: serviceSubCategory,
          as: "subcategory",
          attributes:["id","name"]
        },
      ],
      // order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Home image gallery fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleHomeImageGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await homeImageGallery.findOne({
      where: {
        id,
      },
      include: [
        {
          model: servicecategory,
          as: "category",
        },
        {
          model: serviceSubCategory,
          as: "subcategory",
        },
      ],
      order: [["id", "DESC"]],
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Home image gallery not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Home image gallery fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateHomeImageGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const { service_category_id, service_sub_category_id, title, status } =
      req.body;

    const data = await homeImageGallery.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Home image gallery not found",
      });
    }

    const categoryId =
      service_category_id !== undefined
        ? service_category_id
        : data.service_category_id;

    const subCategoryId =
      service_sub_category_id !== undefined
        ? service_sub_category_id
        : data.service_sub_category_id;

    const checkCategory = await servicecategory.findByPk(categoryId);

    if (!checkCategory) {
      return res.status(400).json({
        status: false,
        message: "Category not found",
      });
    }

    const checkSubCategory = await serviceSubCategory.findOne({
      where: {
        id: subCategoryId,
        service_category_id: categoryId,
      },
    });

    if (!checkSubCategory) {
      return res.status(400).json({
        status: false,
        message: "Sub-category is not present in this category",
      });
    }

    const updateData = {
      service_category_id: categoryId,
      service_sub_category_id: subCategoryId,
    };

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }

      updateData.title = title.toUpperCase();
    }

    if (status !== undefined) {
      if (status !== "0" && status !== "1") {
        return res.status(400).json({
          status: false,
          message: "Status must be either 0 or 1",
        });
      }

      updateData.status = status;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await data.update(updateData);

    return res.status(200).json({
      status: true,
      message: "Home image gallery updated successfully",
      data,
    });
  } catch (error) {
    console.log("Home image gallery update:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteHomeImageGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await homeImageGallery.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Home image gallery not found",
      });
    }

    await data.destroy();

    return res.status(200).json({
      status: true,
      message: "Home image gallery deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createHomeImageGallery,
  getHomeImageGallery,
  getSingleHomeImageGallery,
  updateHomeImageGallery,
  deleteHomeImageGallery,
};
