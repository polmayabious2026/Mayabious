const admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerAdmin = async (req, res) => {
  try {
    const { username, password, status } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide username and password",
      });
    }

    const existingAdmin = await admin.findOne({
      where: {
        username,
      },
    });

    if (existingAdmin) {
      return res.status(409).json({
        status: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createAdmin = await admin.create({
      username,
      password: hashedPassword,
      status: status ?? "1",
    });

    const adminData = {
      id: createAdmin.id,
      username: createAdmin.username,
      status: createAdmin.status,
    };

    return res.status(201).json({
      status: true,
      message: "Admin created successfully",
      data: adminData,
    });
  } catch (error) {
    console.error("registerAdmin:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide username and password",
      });
    }

    const findAdmin = await admin.findOne({
      where: {
        username,
      },
    });

    if (!findAdmin) {
      return res.status(401).json({
        status: false,
        message: "Invalid username or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      findAdmin.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: findAdmin.id,
        username: findAdmin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      status: true,
      message: "Admin login successful",
      data: {
        token: jwtToken,
      },
    });
  } catch (error) {
    console.error("loginAdmin:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const logoutAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Admin logout successfully",
    });
  } catch (error) {
    console.error("logoutAdmin:", error);

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
};
