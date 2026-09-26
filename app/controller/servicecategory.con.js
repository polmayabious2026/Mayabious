const servicecategory = require("../model/service.categoty.model");
const serviceSubCategory = require("../model/service.subcategory.model")

const addServiceCategory = async (req, res) => {
  try {
    console.log("BODY:",req.body)
    const { name, description, status } = req.body;

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
    const upperChaseName = name.toUpperCase()

    const data = await servicecategory.create({
      name:upperChaseName,
      description:description,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Service category added successfully",
      data,
    });
  } catch (error) {
    console.log("addServiceCategory Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getServiceCategories = async (req, res) => {
  try {
    const data = await servicecategory.findAll({
      include:{
        model:serviceSubCategory,
        as:"subcategory"
      }
    });

    return res.status(200).json({
      status: true,
      message: "Service categories fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getServiceCategories Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getServiceCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await servicecategory.findOne({
      where:{
        id:id
      },
      include:{
        model:serviceSubCategory,
        as:"subcategory"
      }
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service category not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Service category fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getServiceCategoryById Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateServiceCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const data = await servicecategory.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service category not found",
      });
    }
    const upperChaseName = name !== undefined ? name.toUpperCase() : data.name;
    await data.update({
      name: upperChaseName !== undefined ? upperChaseName : data.name,
      description: description !== undefined ? description : data.description,
      status: status !== undefined ? status : data.status,
    });

    return res.status(200).json({
      status: true,
      message: "Service category updated successfully",
      data,
    });
  } catch (error) {
    console.log("updateServiceCategory Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteServiceCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await servicecategory.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service category not found",
      });
    }

    await data.destroy();

    return res.status(200).json({
      status: true,
      message: "Service category deleted successfully",
    });
  } catch (error) {
    console.log("deleteServiceCategory Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addServiceCategory,
  getServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
};
