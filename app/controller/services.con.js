const sequelize = require("../config/db")
// models
const services = require("../model/services.model");
const servicecategory = require("../model/service.categoty.model");
const serviceSubCategory = require("../model/service.subcategory.model");

const createServices = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    // console.log("REQ BODY:", req.body);
    // console.log("REQ FILES:", req.files);

    const {
      service_category_id,
      service_sub_category_id,
    } = req.body;


    let title = req.body.title;

  
    if (!Array.isArray(title)) {
      title = title ? [title] : [];
    }

    
    if (
      !service_category_id ||
      !service_sub_category_id ||
      title.length === 0
    ) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message:
          "service_category_id, service_sub_category_id and title are required",
      });
    }


    if (!req.files || req.files.length === 0) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "At least one image is required",
      });
    }

    
    if (title.length !== req.files.length) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Number of titles and images must be the same",
        titleCount: title.length,
        imageCount: req.files.length,
      });
    }

    // Check category
    const checkcategory = await servicecategory.findByPk(
      service_category_id,
      {
        transaction,
      }
    );

    if (!checkcategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Category not found",
      });
    }

    // Check sub-category
    const checkSubCategory = await serviceSubCategory.findByPk(
      service_sub_category_id,
      {
        transaction,
      }
    );

    if (!checkSubCategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Sub-Category not found",
      });
    }

    // Check sub-category belongs to category
    const checksubcategorypresentincategory =
      await serviceSubCategory.findOne({
        where: {
          id: service_sub_category_id,
          service_category_id: service_category_id,
        },
        transaction,
      });

    if (!checksubcategorypresentincategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message:
          "Sub_category is not present in this category",
      });
    }

    
    const servicesData = title.map((item, index) => ({
      service_category_id,
      service_sub_category_id,
      title: item.toUpperCase(),
      image: req.files[index].filename,
      status: "1",
    }));

  
    const data = await services.bulkCreate(
      servicesData,
      {
        transaction,
      }
    );

   
    await transaction.commit();

    return res.status(201).json({
      status: true,
      message: "Services created successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("Services create:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getallServices = async (req, res) => {
  try {
    const data = await services.findAll({
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
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Services fetched successfully",
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
const getSingleServices = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await services.findOne({
      where: {
        id, 
      },
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
      order: [["id", "DESC"]],
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Services not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Services fetched successfully",
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
const updateServices = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const {
      service_category_id,
      service_sub_category_id,
      title,
    } = req.body;

   
    const data = await services.findByPk(id, {
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Services not found",
      });
    }

    
    if (
      !service_category_id ||
      !service_sub_category_id ||
      !title
    ) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message:
          "service_category_id, service_sub_category_id and title are required",
      });
    }

    // Check category exists
    const checkcategory = await servicecategory.findByPk(
      service_category_id,
      {
        transaction,
      }
    );

    if (!checkcategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Category not found",
      });
    }

    // Check sub-category belongs to selected category
    const checksubcategorypresentincategory =
      await serviceSubCategory.findOne({
        where: {
          id: service_sub_category_id,
          service_category_id: service_category_id,
        },
        transaction,
      });

    if (!checksubcategorypresentincategory) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message:
          "Sub_category is not present in this category",
      });
    }

    
    const bold_title = title.toUpperCase();

   
    const image = req.file
      ? req.file.filename
      : data.image;

    // Update service
    await data.update(
      {
        service_category_id,
        service_sub_category_id,
        title: bold_title,
        image,
      },
      {
        transaction,
      }
    );

    // Commit transaction
    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Services updated successfully",
      data,
    });
  } catch (error) {
    
    await transaction.rollback();

    console.log("Services update:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteServices = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await services.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Services not found",
      });
    }

    await data.destroy();

    return res.status(200).json({
      status: true,
      message: "Services deleted successfully",
    });
  } catch (error) {
    console.log("Services delete:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createServices,
  getallServices,
  getSingleServices,
  updateServices,
  deleteServices,
};
