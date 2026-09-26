const sequelize = require("../config/db");
const {
  career,
  value,
  jobvacancy,
  perksbenifit,
} = require("../model/career.model");

const path = require("path");
const fs = require("fs");

/* =========================================================
   CAREER
========================================================= */

// ADD CAREER
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

// GET ALL CAREER
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

// GET SINGLE CAREER
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

// UPDATE CAREER
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
    if (
      req.file &&
      oldBannerImage &&
      oldBannerImage !== req.file.filename
    ) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        oldBannerImage
      );

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

// DELETE CAREER
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


/* =========================================================
   JOB VACANCY
========================================================= */

// ADD JOB VACANCY
const addJobVacancy = async (req, res) => {
  try {
    const {
      career_id,
      servicecategory_id,
      serviceSubCategory_id,
      title,
      content,
      description,
      status,
    } = req.body;

    if (!career_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide career id",
      });
    }

    if (!servicecategory_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide service category id",
      });
    }

    if (!serviceSubCategory_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide service sub category id",
      });
    }

    if (!title) {
      return res.status(400).json({
        status: false,
        message: "Please provide title",
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

    const careerData = await career.findByPk(career_id);

    if (!careerData) {
      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const jobData = await jobvacancy.create({
      career_id,
      servicecategory_id,
      serviceSubCategory_id,
      title,
      content,
      description,
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

// GET ALL JOB VACANCIES
const getAllJobVacancy = async (req, res) => {
  try {
    const data = await jobvacancy.findAll({
      order: [["id", "DESC"]],
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

// GET SINGLE JOB VACANCY
const getSingleJobVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await jobvacancy.findByPk(id);

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

// UPDATE JOB VACANCY
const updateJobVacancy = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const {
      career_id,
      servicecategory_id,
      serviceSubCategory_id,
      title,
      content,
      description,
      status,
    } = req.body;

    const data = await jobvacancy.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
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

    if (servicecategory_id !== undefined) {
      updateData.servicecategory_id = servicecategory_id;
    }

    if (serviceSubCategory_id !== undefined) {
      updateData.serviceSubCategory_id = serviceSubCategory_id;
    }

    if (title !== undefined) {
      updateData.title = title;
    }

    if (content !== undefined) {
      updateData.content = content;
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
      message: "Job vacancy updated successfully",
      data,
    });
  } catch (error) {
    await transaction.rollback();

    console.log("updateJobVacancy Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// DELETE JOB VACANCY
const deleteJobVacancy = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await jobvacancy.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
      });
    }

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    return res.status(200).json({
      status: true,
      message: "Job vacancy deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteJobVacancy Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


/* =========================================================
   VALUE
========================================================= */

// ADD VALUE
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
      title,
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

// GET ALL VALUES
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

// GET SINGLE VALUE
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

// UPDATE VALUE
const updateValue = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const {
      career_id,
      title,
      description,
      status,
    } = req.body;

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
      updateData.title = title;
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

// DELETE VALUE
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


/* =========================================================
   PERKS AND BENEFIT
========================================================= */

// ADD PERK/BENEFIT
const addPerksBenefit = async (req, res) => {
  try {
    const { career_id, option, status } = req.body;

    if (!career_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide career id",
      });
    }

    if (!option) {
      return res.status(400).json({
        status: false,
        message: "Please provide option",
      });
    }

    const careerData = await career.findByPk(career_id);

    if (!careerData) {
      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const perkData = await perksbenifit.create({
      career_id,
      option,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Perk and benefit added successfully",
      data: perkData,
    });
  } catch (error) {
    console.log("addPerksBenefit Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// GET ALL PERKS/BENEFITS
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

// GET SINGLE PERK/BENEFIT
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

// UPDATE PERK/BENEFIT
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

// DELETE PERK/BENEFIT
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


/* =========================================================
   EXPORTS
========================================================= */

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
};
