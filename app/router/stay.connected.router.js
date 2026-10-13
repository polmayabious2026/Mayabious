const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check")

const {
  createStayConnected,
  allStayConnected,
  getSingleStayConnected,
  deleteStayConnected,
} = require("../controller/stayconnected.con");

// admin
router.get("/getall_stay_connected",adminCheck,allStayConnected);
router.get("/gets_stay_connected/:id",adminCheck,getSingleStayConnected);
router.delete("/delete_tay_connected/:id",adminCheck,deleteStayConnected);

// frontend
router.post("/stay_connected",createStayConnected);

module.exports = router;
