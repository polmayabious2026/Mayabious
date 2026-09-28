const sequelize = require("../config/db");
const {
  career,
  value,
  jobvacancy,
  perksbenifit,
  department,
  designation,
  applycandidate,
} = require("../model/career.model");

const path = require("path");
const fs = require("fs");

//  CAREER*************************************

const addCareer = async (req, res) => {
  try {
    const { status } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please provide banner image",
      });
    }

    const careerData = await career.create({
      bannerimage: req.file.filename,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Career added successfully",
      data: careerData,
    });
  } catch (error) {
    console.log("addCareer Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllCareer = async (req, res) => {
  try {
    const data = await career.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Career fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllCareer Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await career.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Career fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleCareer Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateCareer = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = await career.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const oldBannerImage = data.bannerimage;

    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (req.file) {
      updateData.bannerimage = req.file.filename;
    }

    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    // Delete old image after successful update
    if (req.file && oldBannerImage && oldBannerImage !== req.file.filename) {
      const oldImagePath = path.join(__dirname, "../uploads", oldBannerImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Career updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updateCareer Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteCareer = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await career.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const imageName = data.bannerimage;

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    // Delete image
    if (imageName) {
      const imagePath = path.join(__dirname, "../uploads", imageName);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteCareer Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//  JOB VACANCY*********************************

const addJobVacancy = async (req, res) => {
  try {
    const { department_id, designation_id } = req.params;
    const { content, description, status } = req.body;
    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }
    if (!designation_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide service designation_id",
      });
    }
    if (!content) {
      return res.status(400).json({
        status: false,
        message: "Please provide content",
      });
    }
    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    const department_Data = await department.findByPk(department_id);

    if (!department_Data) {
      return res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }

    const designation_Data = await designation.findOne({
      where: {
        id: designation_id,
        department_id: department_id,
      },
    });

    if (!designation_Data) {
      return res.status(404).json({
        status: false,
        message: "Designation not present under this department",
      });
    }

    const jobData = await jobvacancy.create({
      department_id: department_id,
      designation_id: designation_id,
      content: content,
      description: description,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Job vacancy added successfully",
      data: jobData,
    });
  } catch (error) {
    console.log("addJobVacancy Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllJobVacancy = async (req, res) => {
  try {
    const data = await jobvacancy.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Job vacancies fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllJobVacancy Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleJobVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await jobvacancy.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
      ],
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Job vacancy fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleJobVacancy Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateJobVacancy = async (req, res) => {
  try {
    const { department_id, designation_id, id } = req.params;
    const { content, description, status } = req.body;

    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

    if (!designation_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide designation id",
      });
    }

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide job vacancy id",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide content",
      });
    }

    // if (!description?.trim()) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Please provide description",
    //   });
    // }

    const department_Data = await department.findByPk(department_id);

    if (!department_Data) {
      return res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }

    const designation_Data = await designation.findOne({
      where: {
        id: designation_id,
        department_id: department_id,
      },
    });

    if (!designation_Data) {
      return res.status(404).json({
        status: false,
        message: "Designation not present under this department",
      });
    }

    const jobData = await jobvacancy.findOne({
      where: {
        id: id,
        department_id: department_id,
        designation_id: designation_id,
      },
    });

    if (!jobData) {
      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
      });
    }

    const updateData = {};

    if (content !== undefined) {
      updateData.content = content;
    }
    if (description !== undefined) {
      updateData.description = description;
    }

    await jobData.update({
      updateData,
      status: status ?? jobData.status,
    });

    return res.status(200).json({
      status: true,
      message: "Job vacancy updated successfully",
      data: jobData,
    });
  } catch (error) {
    console.error("updateJobVacancy Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteJobVacancy = async (req, res) => {
  try {
    const { department_id, designation_id, id } = req.params;

    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

    if (!designation_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide designation id",
      });
    }

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide job vacancy id",
      });
    }

    // Check department
    const department_Data = await department.findByPk(department_id);

    if (!department_Data) {
      return res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }

    // Check designation under this department
    const designation_Data = await designation.findOne({
      where: {
        id: designation_id,
        department_id: department_id,
      },
    });

    if (!designation_Data) {
      return res.status(404).json({
        status: false,
        message: "Designation not present under this department",
      });
    }

    // Find job vacancy
    const jobData = await jobvacancy.findOne({
      where: {
        id: id,
        department_id: department_id,
        designation_id: designation_id,
      },
    });

    if (!jobData) {
      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
      });
    }

    await jobData.destroy();

    return res.status(200).json({
      status: true,
      message: "Job vacancy deleted successfully",
    });
  } catch (error) {
    console.error("deleteJobVacancy Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

//  VALUE******************************
const addValue = async (req, res) => {
  try {
    const { career_id, title, description, status } = req.body;

    if (!career_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide career id",
      });
    }

    if (!title) {
      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    if (!description) {
      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }

    const careerData = await career.findByPk(career_id);

    if (!careerData) {
      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const valueData = await value.create({
      career_id,
      title: title.toUpperCase(),
      description,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Value added successfully",
      data: valueData,
    });
  } catch (error) {
    console.log("addValue Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllValue = async (req, res) => {
  try {
    const data = await value.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Values fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllValue Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleValue = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await value.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Value not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Value fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleValue Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateValue = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const { career_id, title, description, status } = req.body;

    const data = await value.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Value not found",
      });
    }

    if (career_id !== undefined) {
      const careerData = await career.findByPk(career_id);

      if (!careerData) {
        await transaction.rollback();

        return res.status(404).json({
          status: false,
          message: "Career not found",
        });
      }
    }

    const updateData = {};

    if (career_id !== undefined) {
      updateData.career_id = career_id;
    }

    if (title !== undefined) {
      updateData.title = title.toUpperCase();
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Value updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updateValue Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteValue = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await value.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Value not found",
      });
    }

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Value deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteValue Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//  PERKS AND BENEFIT**********************

const addPerksBenefit = async (req, res) => {
  try {
    const { career_id, options } = req.body;

    if (!career_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide career id",
      });
    }

    if (!options || !options.length) {
      return res.status(400).json({
        status: false,
        message: "Please provide options",
      });
    }

    const careerData = await career.findByPk(career_id);

    if (!careerData) {
      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const perkData = await perksbenifit.bulkCreate(
      options.map((option) => ({
        career_id,
        option,
        status: "1",
      })),
    );

    return res.status(201).json({
      status: true,
      message: "Perks and benefits added successfully",
      data: perkData,
    });
  } catch (error) {
    console.log("addPerksBenefit Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getAllPerksBenefit = async (req, res) => {
  try {
    const data = await perksbenifit.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Perks and benefits fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllPerksBenefit Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSinglePerksBenefit = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await perksbenifit.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Perk and benefit not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Perk and benefit fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSinglePerksBenefit Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updatePerksBenefit = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { career_id, option, status } = req.body;

    const data = await perksbenifit.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Perk and benefit not found",
      });
    }

    if (career_id !== undefined) {
      const careerData = await career.findByPk(career_id);

      if (!careerData) {
        await transaction.rollback();

        return res.status(404).json({
          status: false,
          message: "Career not found",
        });
      }
    }

    const updateData = {};

    if (career_id !== undefined) {
      updateData.career_id = career_id;
    }

    if (option !== undefined) {
      updateData.option = option;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    await data.update(updateData, {
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Perk and benefit updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updatePerksBenefit Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deletePerksBenefit = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await perksbenifit.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Perk and benefit not found",
      });
    }

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Perk and benefit deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deletePerksBenefit Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//  DEPARTMENT******************

const addDepartment = async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Please provide name ",
      });
    }
    const addData = await department.create({
      name: name,
      status: status || "1",
    });
    return res.status(200).json({
      status: true,
      message: "Department added successfully",
      data: addData,
    });
  } catch (error) {
    console.log("addDepartment Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getDepartment = async (req, res) => {
  try {
    const alldata = await department.findAll({
      include: {
        model: designation,
        as: "designation",
      },
    });
    if (!alldata) {
      return res.status(404).json({
        status: false,
        message: "No department found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "All department fetched successfully",
      alldata,
    });
  } catch (error) {
    console.log("getDepartment Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleData = await department.findOne({
      where: {
        id: id,
      },
      include: {
        model: designation,
        as: "designation",
      },
    });
    if (!getSingleData) {
      return res.status(404).json({
        status: false,
        message: "No department found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Department fetched successfully",
      getSingleData,
    });
  } catch (error) {
    console.log("getSingleDepartment Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateDepartment = async (req, res) => {
  try {
    const { name, status } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }

    const departmentData = await department.findByPk(id);

    if (!departmentData) {
      return res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }

    await departmentData.update({
      name: name.trim(),
      status: status ?? departmentData.status,
    });

    return res.status(200).json({
      status: true,
      message: "Department updated successfully",
      data: departmentData,
    });
  } catch (error) {
    console.error("updateDepartment Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

    const departmentData = await department.findByPk(id);

    if (!departmentData) {
      return res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }

    await departmentData.destroy();

    return res.status(200).json({
      status: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("deleteDepartment Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

//  Designation********************

const addDesignation = async (req, res) => {
  try {
    const { name, status } = req.body;
    const { department_id } = req.params;

    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Department ID is required",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Designation name is required",
      });
    }

    const addData = await designation.create({
      department_id: department_id,
      name: name.trim().toUpperCase(),
      status: status ?? "1",
    });

    return res.status(201).json({
      status: true,
      message: "Designation added successfully",
      data: addData,
    });
  } catch (error) {
    console.error("addDesignation Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
const getDesignation = async (req, res) => {
  try {
    const alldata = await designation.findAll({
      include: {
        model: department,
        as: "department",
      },
    });
    if (!alldata) {
      return res.status(404).json({
        status: false,
        message: "No designation found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "All designation fetched successfully",
      alldata,
    });
  } catch (error) {
    console.log("getDesignation Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleDesignationData = await designation.findOne({
      where: {
        id: id,
      },
      include: {
        model: department,
        as: "department",
      },
    });
    if (!getSingleDesignationData) {
      return res.status(404).json({
        status: false,
        message: "No designation found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Designation fetched successfully",
      getSingleDesignationData,
    });
  } catch (error) {
    console.log("getSingleDesignation Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateDesignation = async (req, res) => {
  try {
    const { name, status } = req.body;
    const { department_id, id } = req.params;

    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Department ID is required",
      });
    }

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Designation ID is required",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Designation name is required",
      });
    }
    const departmentData = await department.findByPk(department_id);
    if (!departmentData) {
      return res.status(400).json({
        status: false,
        message: "Department not found",
      });
    }
    const designationData = await designation.findOne({
      where: {
        id: id,
        department_id: department_id,
      },
    });

    if (!designationData) {
      return res.status(404).json({
        status: false,
        message: "Designation not found",
      });
    }

    await designationData.update({
      name: name.trim().toUpperCase(),
      status: status ?? designationData.status,
    });

    return res.status(200).json({
      status: true,
      message: "Designation updated successfully",
      data: designationData,
    });
  } catch (error) {
    console.error("updateDesignation Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Designation ID is required",
      });
    }

    const designationData = await designation.findOne({
      where: {
        id: id,
      },
    });

    if (!designationData) {
      return res.status(404).json({
        status: false,
        message: "Designation not found",
      });
    }

    await designationData.destroy();

    return res.status(200).json({
      status: true,
      message: "Designation deleted successfully",
    });
  } catch (error) {
    console.error("deleteDesignation Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

//  ApplyNow********************

const addApplyCandidate = async (req, res) => {
  try {
    const { department_id, designation_id, user_name, phone, email } = req.body;

    const resume = req.file?.filename;

    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

    if (!designation_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide designation id",
      });
    }

    if (!user_name?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide user name",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide phone",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide email",
      });
    }

    if (!resume) {
      return res.status(400).json({
        status: false,
        message: "Please provide resume",
      });
    }

    const departmentData = await department.findByPk(department_id);

    if (!departmentData) {
      return res.status(404).json({
        status: false,
        message: "Department not found",
      });
    }

    const designationData = await designation.findOne({
      where: {
        id: designation_id,
        department_id: department_id,
      },
    });

    if (!designationData) {
      return res.status(404).json({
        status: false,
        message: "Designation not present under this department",
      });
    }

    const candidateData = await applycandidate.create({
      department_id,
      designation_id,
      user_name: user_name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      resume,
    });

    return res.status(201).json({
      status: true,
      message: "Candidate applied successfully",
      data: candidateData,
    });
  } catch (error) {
    console.error("addApplyCandidate Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getAllApplyCandidate = async (req, res) => {
  try {
    const data = await applycandidate.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Candidates fetched successfully",
      data,
    });
  } catch (error) {
    console.error("getAllApplyCandidate Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
const getSingleApplyCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await applycandidate.findOne({
      where: {
        id,
      },
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
      ],
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Candidate not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Candidate fetched successfully",
      data,
    });
  } catch (error) {
    console.error("getSingleApplyCandidate Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
const updateApplyCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const { department_id, designation_id, user_name, phone, email } = req.body;

    const resume = req.file?.filename;

    const candidateData = await applycandidate.findByPk(id);

    if (!candidateData) {
      return res.status(404).json({
        status: false,
        message: "Candidate not found",
      });
    }

    if (!department_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

    if (!designation_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide designation id",
      });
    }

    if (!user_name?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide user name",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide phone",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide email",
      });
    }

    const designationData = await designation.findOne({
      where: {
        id: designation_id,
        department_id,
      },
    });

    if (!designationData) {
      return res.status(404).json({
        status: false,
        message: "Designation not present under this department",
      });
    }

    await candidateData.update({
      department_id,
      designation_id,
      user_name: user_name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      ...(resume && { resume }),
    });

    return res.status(200).json({
      status: true,
      message: "Candidate updated successfully",
      data: candidateData,
    });
  } catch (error) {
    console.error("updateApplyCandidate Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteApplyCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidateData = await applycandidate.findByPk(id);

    if (!candidateData) {
      return res.status(404).json({
        status: false,
        message: "Candidate not found",
      });
    }

    await candidateData.destroy();

    return res.status(200).json({
      status: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    console.error("deleteApplyCandidate Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

//  EXPORTS

module.exports = {
  // Career
  addCareer,
  getAllCareer,
  getSingleCareer,
  updateCareer,
  deleteCareer,

  // Job Vacancy
  addJobVacancy,
  getAllJobVacancy,
  getSingleJobVacancy,
  updateJobVacancy,
  deleteJobVacancy,

  // Value
  addValue,
  getAllValue,
  getSingleValue,
  updateValue,
  deleteValue,

  // Perks & Benefits
  addPerksBenefit,
  getAllPerksBenefit,
  getSinglePerksBenefit,
  updatePerksBenefit,
  deletePerksBenefit,

  // DEPARTMENT
  addDepartment,
  getDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,

  // Designation
  addDesignation,
  getDesignation,
  getSingleDesignation,
  updateDesignation,
  deleteDesignation,

  // applynow
  addApplyCandidate,
  getAllApplyCandidate,
  getSingleApplyCandidate,
  updateApplyCandidate,
  deleteApplyCandidate,
};
