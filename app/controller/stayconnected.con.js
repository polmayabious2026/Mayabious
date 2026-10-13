const stayconnected = require("../model/stayconnected.model");
const { all } = require("../router");

const createStayConnected = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !String(email).trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide email",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid email address",
      });
    }

    const addData = await stayconnected.create({
      email: email,
    });

    return res.status(201).json({
      status: true,
      message: "Stay Connected created successfully",
      data: addData,
    });
  } catch (error) {
    console.log("createStayConnected:", error);
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};
const allStayConnected = async (req, res) => {
  try {
    const allData = await stayconnected.findAll();

    return res.status(200).json({
      status: true,
      message: "All Stay Conneceted fetched successfully",
      data: allData,
    });
  } catch (error) {
    console.log("allStayConnected:", error);
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};
const getSingleStayConnected = async (req, res) => {
  try {
    const { id } = req.params;
    const findData = await stayconnected.findByPk(id);
    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      status: true,
      message: " Stay Conneceted fetched successfully",
      data: findData,
    });
  } catch (error) {
    console.log("allStayConnected:", error);
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};
const deleteStayConnected = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await stayconnected.destroy({ id });
    return res.status(200).json({
      status: true,
      message: "Stay Conneceted deleted successfully",
    });
  } catch (error) {
    console.log("deleteStayConnected:", error);
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};
module.exports = {
  createStayConnected,
  allStayConnected,
  getSingleStayConnected,
  deleteStayConnected,
};
