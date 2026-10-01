const serviceSubCategory = require("../model/service.subcategory.model");
const servicecategory = require("../model/service.categoty.model");

const addServiceSubCategory = async (req, res) => {
  try {
    const { name, service_category_id, status,description } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }
    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    if (!service_category_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide service_category_id",
      });
    }

    const data = await serviceSubCategory.create({
      name: name,
      service_category_id: service_category_id,
      description:description,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Service Sub category added successfully",
      data,
    });
  } catch (error) {
    console.log("addserviceSubCategory Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getServiceSubCategories = async (req, res) => {
  try {
    const data = await serviceSubCategory.findAll({
      attributes:["id","name","description"],
        include:{
            model:servicecategory,
            as:"category",
            attributes:["id","name"]
        }
    });

    return res.status(200).json({
      status: true,
      message: "Service Sub categories fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getServiceSubCategories Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getServiceSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await serviceSubCategory.findOne({
        where:{
            id:id
        },
        include:{
            model:servicecategory,
            as:"category",
            attributes:["id","name"]
        }
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service Sub category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Service Sub category fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getServiceSubCategoryById Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateServiceSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, service_category_id, status,description } = req.body;

    const data = await serviceSubCategory.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service sub category not found",
      });
    }

    await data.update({
      name: name !== undefined ? name : data.name,
      service_category_id:
        service_category_id !== undefined
          ? service_category_id
          : data.service_category_id,
      status: status !== undefined ? status : data.status,
      description:description!==undefined?description:data.description,
    });

    return res.status(200).json({
      status: true,
      message: "Service sub category updated successfully",
      data,
    });
  } catch (error) {
    console.log("updateServiceSubCategory Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteServiceSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await serviceSubCategory.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service sub category not found",
      });
    }

    await data.destroy();

    return res.status(200).json({
      status: true,
      message: "Service sub category deleted successfully",
    });
  } catch (error) {
    console.log("deleteServiceSubCategory Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addServiceSubCategory,
  getServiceSubCategories,
  getServiceSubCategoryById,
  updateServiceSubCategory,
  deleteServiceSubCategory,
};
