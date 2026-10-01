const jwt = require("jsonwebtoken");
const admin = require("../model/admin.model");

const adminCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const findAdmin = await admin.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!findAdmin) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (findAdmin.status !== "1") {
      return res.status(403).json({
        status: false,
        message: "Admin account is inactive",
      });
    }

    req.admin = findAdmin;

    next();
  } catch (error) {
    console.error("adminCheck:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

module.exports = adminCheck;
