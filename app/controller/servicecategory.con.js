const servicecategory = require("../model/service.categoty.model");
const serviceSubCategory = require("../model/service.subcategory.model")

const sequelize = require("../config/db")

const addServiceCategory = async (req, res) => {
  try {
    // console.log("BODY:",req.body)
    const { name, description, status,position } = req.body;

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }

    
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please provide icon",
      });
    }
    const upperChaseName = name.toUpperCase()

    const data = await servicecategory.create({
      name:upperChaseName,
      description:description,
      icon:req.file.filename,
      position:position,
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
      attributes:["id","name","description","icon","position"],
      order:[["position","ASC"]],
      include:{
        model:serviceSubCategory,
        as:"subcategory",
        attributes:["id","name"],
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
        as:"subcategory",
        attributes:["id","name"],
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
    const { name, description, status ,position} = req.body;

    const data = await servicecategory.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Service category not found",
      });
    }

    if (name !== undefined && !String(name).trim()) {
      return res.status(400).json({
        status: false,
        message: "Name cannot be empty",
      });
    }

    if (
      status !== undefined &&
      !["0", "1", 0, 1].includes(status)
    ) {
      return res.status(400).json({
        status: false,
        message: "Status must be either 0 or 1",
      });
    }


    const updateData = {
      name:
        name !== undefined
          ? String(name).trim().toUpperCase()
          : data.name,

      description:
        description !== undefined
          ? String(description).trim()
          : data.description,

      status:
        status !== undefined
          ? String(status)
          : data.status,
      position:position ?? data.position,

    };


    if (req.file) {
      updateData.icon = req.file.filename;
    }

    await data.update(updateData);


    return res.status(200).json({
      status: true,
      message: "Service category updated successfully",
      data,
    });
  } catch (error) {
    console.log("updateServiceCategory Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteServiceCategory = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const data = await servicecategory.findByPk(id, {
      transaction,
    });

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Service category not found",
      });
    }
    await data.destroy({
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Service category deleted successfully",
    });
  } catch (error) {

    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.log("deleteServiceCategory Error:", error);

    return res.status(500).json({
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
