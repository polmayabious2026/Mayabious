const sequelize = require("../config/db");
const {
  career,
  value,
  jobvacancy,
  perksbenifit,
  department,
  designation,
  jobtype,
  jobvacancyjobtype,
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
  const t = await sequelize.transaction();

  try {
    const { department_id, designation_id } = req.params;
    let { jobtype_id, description, status } = req.body;

    
    if (!department_id) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide department id",
      });
    }

  
    if (!designation_id) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide designation id",
      });
    }

   
    if (jobtype_id === undefined || jobtype_id === null) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide jobtype id",
      });
    }


    if (!Array.isArray(jobtype_id)) {
      jobtype_id = [jobtype_id];
    }

    if (!jobtype_id.length) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide at least one jobtype id",
      });
    }


    jobtype_id = [...new Set(jobtype_id)];


    if (!description || !description.trim()) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide description",
      });
    }


    const departmentData = await department.findByPk(department_id, {
      transaction: t,
    });

    if (!departmentData) {
      await t.rollback();

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
      transaction: t,
    });

    if (!designationData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Designation not present under this department",
      });
    }

    const jobTypeData = await jobtype.findAll({
      where: {
        id: jobtype_id,
      },
      transaction: t,
    });

    if (jobTypeData.length !== jobtype_id.length) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "One or more job types not found",
      });
    }

 
    const jobData = await jobvacancy.create(
      {
        department_id,
        designation_id,
        description: description.trim(),
        status: status || "1",
      },
      {
        transaction: t,
      }
    );

 
    const jobTypeMappings = jobtype_id.map((jobTypeId) => ({
      jobvacancy_id: jobData.id,
      jobtype_id: jobTypeId,
    }));

    await jobvacancyjobtype.bulkCreate(jobTypeMappings, {
      transaction: t,
    });

    await t.commit();


    const result = await jobvacancy.findByPk(jobData.id, {
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
        {
          model: jobtype,
          as: "jobtypes",
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(201).json({
      status: true,
      message: "Job vacancy added successfully",
      data: result,
    });
  } catch (error) {
    await t.rollback();

    console.log("addJobVacancy Error:", error);

    return res.status(500).json({
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
        {
          model: jobtype,
          as: "jobtypes",
          through: {
            attributes: [],
          },
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

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleJobVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide job vacancy id",
      });
    }

    const data = await jobvacancy.findByPk(id, {
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
        {
          model: jobtype,
          as: "jobtypes",
          through: {
            attributes: [],
          },
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

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateJobVacancy = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    let {
      department_id,
      designation_id,
      jobtype_id,
      description,
      status,
    } = req.body;

  
    if (!id) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide job vacancy id",
      });
    }

    const jobData = await jobvacancy.findByPk(id, {
      transaction: t,
    });

    if (!jobData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
      });
    }


    if (department_id !== undefined) {
      const departmentData = await department.findByPk(department_id, {
        transaction: t,
      });

      if (!departmentData) {
        await t.rollback();

        return res.status(404).json({
          status: false,
          message: "Department not found",
        });
      }
    }


    const finalDepartmentId =
      department_id !== undefined
        ? department_id
        : jobData.department_id;


    if (designation_id !== undefined) {
      const designationData = await designation.findOne({
        where: {
          id: designation_id,
          department_id: finalDepartmentId,
        },
        transaction: t,
      });

      if (!designationData) {
        await t.rollback();

        return res.status(404).json({
          status: false,
          message: "Designation not present under this department",
        });
      }
    }


    if (jobtype_id !== undefined) {
   
      if (!Array.isArray(jobtype_id)) {
        jobtype_id = [jobtype_id];
      }

      if (!jobtype_id.length) {
        await t.rollback();

        return res.status(400).json({
          status: false,
          message: "Please provide at least one jobtype id",
        });
      }

    
      jobtype_id = [...new Set(jobtype_id)];

      const jobTypeData = await jobtype.findAll({
        where: {
          id: jobtype_id,
        },
        transaction: t,
      });

      if (jobTypeData.length !== jobtype_id.length) {
        await t.rollback();

        return res.status(404).json({
          status: false,
          message: "One or more job types not found",
        });
      }
    }


    if (
      description !== undefined &&
      (!description || !description.trim())
    ) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Description cannot be empty",
      });
    }


    const updateData = {};

    if (department_id !== undefined) {
      updateData.department_id = department_id;
    }

    if (designation_id !== undefined) {
      updateData.designation_id = designation_id;
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (Object.keys(updateData).length) {
      await jobData.update(updateData, {
        transaction: t,
      });
    }


    if (jobtype_id !== undefined) {
      
      await jobvacancyjobtype.destroy({
        where: {
          jobvacancy_id: id,
        },
        transaction: t,
      });

      
      const mappings = jobtype_id.map((jobTypeId) => ({
        jobvacancy_id: id,
        jobtype_id: jobTypeId,
      }));

      await jobvacancyjobtype.bulkCreate(mappings, {
        transaction: t,
      });
    }


    if (
      !Object.keys(updateData).length &&
      jobtype_id === undefined
    ) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    await t.commit();


    const result = await jobvacancy.findByPk(id, {
      include: [
        {
          model: department,
          as: "department",
        },
        {
          model: designation,
          as: "designation",
        },
        {
          model: jobtype,
          as: "jobtypes",
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json({
      status: true,
      message: "Job vacancy updated successfully",
      data: result,
    });
  } catch (error) {
    await t.rollback();

    console.log("updateJobVacancy Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteJobVacancy = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;


    if (!id) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide job vacancy id",
      });
    }

    const jobData = await jobvacancy.findByPk(id, {
      transaction: t,
    });

    if (!jobData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Job vacancy not found",
      });
    }


    await jobvacancyjobtype.destroy({
      where: {
        jobvacancy_id: id,
      },
      transaction: t,
    });


    await jobData.destroy({
      transaction: t,
    });

    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Job vacancy deleted successfully",
    });
  } catch (error) {
    await t.rollback();

    console.log("deleteJobVacancy Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


//  VALUE******************************
const addValue = async (req, res) => {
  try {
    const { career_id, options } = req.body;

    if (!career_id) {
      return res.status(400).json({
        status: false,
        message: "Please provide career id",
      });
    }

    if (!options || !Array.isArray(options) || !options.length) {
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

    const valueData = await value.bulkCreate(
      options.map((option) => ({
        career_id,
        title: option.title.toUpperCase(),
        description: option.description,
        status: option.status || "1",
      })),
    );

    return res.status(201).json({
      status: true,
      message: "Values added successfully",
      data: valueData,
    });
  } catch (error) {
    console.log("addValue Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getAllValue = async (req, res) => {
  try {
    const data = await value.findAll({
      // order: [["id", "DESC"]],
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
  const t = await sequelize.transaction();

  try {
    const { career_id } = req.body;

    let { option } = req.body;

    // console.log("============================");
    // console.log("CAREER ID:", career_id);
    // console.log("OPTIONS:", option);
    // console.log("FILES:", req.files);
    // console.log("============================");

    if (!career_id) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide career id",
      });
    }

    if (!Array.isArray(option)) {
      option = option ? [option] : [];
    }

    if (!option.length) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide option",
      });
    }

    if (!req.files || !req.files.length) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide images",
      });
    }

    if (option.length !== req.files.length) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Number of options and images must be the same",
      });
    }

    const careerData = await career.findByPk(career_id, {
      transaction: t,
    });

    if (!careerData) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Career not found",
      });
    }

    const perkData = await perksbenifit.bulkCreate(
      option.map((item, index) => ({
        career_id,
        option: item,
        image: req.files[index].filename,
        status: "1",
      })),
      {
        transaction: t,
      },
    );

    await t.commit();

    return res.status(201).json({
      status: true,
      message: "Perks and benefits added successfully",
      data: perkData,
    });
  } catch (error) {
    await t.rollback();

    console.log("addPerksBenefit Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
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

    return res.status(500).json({
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

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updatePerksBenefit = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { career_id, option, status } = req.body;

    const data = await perksbenifit.findByPk(id, {
      transaction: t,
    });

    if (!data) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Perk and benefit not found",
      });
    }

    // Check career if career_id is being updated
    if (career_id !== undefined) {
      const careerData = await career.findByPk(career_id, {
        transaction: t,
      });

      if (!careerData) {
        await t.rollback();

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

    
    if (req.file) {
      updateData.image = req.file.filename;
    }

   
    if (status !== undefined) {
      updateData.status = status;
    }

    
    if (!Object.keys(updateData).length) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide data to update",
      });
    }

    await data.update(updateData, {
      transaction: t,
    });

    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Perk and benefit updated successfully",
      data,
    });
  } catch (error) {
    await t.rollback();

    console.log("updatePerksBenefit Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deletePerksBenefit = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await perksbenifit.findByPk(id, {
      transaction: t,
    });

    if (!data) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Perk and benefit not found",
      });
    }

    await data.destroy({
      transaction: t,
    });

    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Perk and benefit deleted successfully",
    });
  } catch (error) {
    await t.rollback();

    console.log("deletePerksBenefit Error:", error);

    return res.status(500).json({
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

// jobtype*********************
const addJobType = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    let { title } = req.body;

    // Convert single title to array
    if (!Array.isArray(title)) {
      title = title ? [title] : [];
    }

    if (!title.length) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    // Validate titles
    for (const item of title) {
      if (!item || !item.trim()) {
        await t.rollback();

        return res.status(400).json({
          status: false,
          message: "Title cannot be empty",
        });
      }
    }

    // Create multiple job types
    const jobTypeData = await jobtype.bulkCreate(
      title.map((item) => ({
        title: item.trim(),
      })),
      {
        transaction: t,
      }
    );

    await t.commit();

    return res.status(201).json({
      status: true,
      message: "Job type added successfully",
      data: jobTypeData,
    });
  } catch (error) {
    await t.rollback();

    console.log("addJobType Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllJobType = async (req, res) => {
  try {
    const data = await jobtype.findAll({
      // order: [["id", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Job types fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getAllJobType Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleJobType = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await jobtype.findByPk(id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Job type not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Job type fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleJobType Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateJobType = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { title } = req.body;

    const data = await jobtype.findByPk(id, {
      transaction: t,
    });

    if (!data) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Job type not found",
      });
    }

    if (title === undefined || !title.trim()) {
      await t.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide title",
      });
    }

    await data.update(
      {
        title: title.trim(),
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Job type updated successfully",
      data,
    });
  } catch (error) {
    await t.rollback();

    console.log("updateJobType Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteJobType = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await jobtype.findByPk(id, {
      transaction: t,
    });

    if (!data) {
      await t.rollback();

      return res.status(404).json({
        status: false,
        message: "Job type not found",
      });
    }

    await data.destroy({
      transaction: t,
    });

    await t.commit();

    return res.status(200).json({
      status: true,
      message: "Job type deleted successfully",
    });
  } catch (error) {
    await t.rollback();

    console.log("deleteJobType Error:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
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

  // jobtype
    addJobType,
  getAllJobType,
  getSingleJobType,
  updateJobType,
  deleteJobType,

  // applynow
  addApplyCandidate,
  getAllApplyCandidate,
  getSingleApplyCandidate,
  updateApplyCandidate,
  deleteApplyCandidate,
};
