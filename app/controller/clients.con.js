const sequelize = require("../config/db");

const clients = require("../model/clients.model");

const addClients = async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Please provide logo",
      });
    }
    const clientsData = await clients.create({
      name: name.toUpperCase(),
      logo: req.file.filename,
      status: status || "1",
    });

    return res.status(201).json({
      status: true,
      message: "Clients added successfully",
      data: clientsData,
    });
  } catch (error) {
    console.log("createClients Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getallclients = async (req, res) => {
  try {
    const alClients = await clients.findAll();
    return res.status(200).json({
      status: true,
      message: "Clients fatched successfully",
      data: alClients,
    });
  } catch (error) {
    console.log("getallClients Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getSingleclients = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await clients.findByPk(id);

    return res.status(200).json({
      status: true,
      message: "Clients fetched successfully",
      data,
    });
  } catch (error) {
    console.log("getSingleclients Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateClients = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const data = await clients.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Clients not found",
      });
    }

    if (!name) {
      await transaction.rollback();

      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }
    const oldlogo = data.logo;

    const logoName = req.file ? req.file.filename : oldlogo;

    await data.update(
      {
        name: name.toUpperCase(),
        logo: logoName,
        status: status || data.status,
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    if (req.file && oldlogo && oldlogo !== logoName) {
      const oldLogoPath = path.join(__dirname, "../uploads", oldlogo);

      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Clients updated successfully",
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
const deleteClients = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;

    const data = await clients.findByPk(id);

    if (!data) {
      await transaction.rollback();

      return res.status(404).json({
        status: false,
        message: "Clients not found",
      });
    }

    const logoName = data.logo;

    await data.destroy({
      transaction,
    });

    await transaction.commit();

    if (logoName) {
      const imagePath = path.join(__dirname, "../uploads", logoName);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({
      status: true,
      message: "Clients deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();

    console.log("deleteClients Error:", error);

    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  addClients,
  getallclients,
  getSingleclients,
  updateClients,
  deleteClients,
};
