const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const {createEnquiry, getAllEnquiry} = require("../controller/enquiry.con");

// frontend
router.post("/create-enquiry",createEnquiry);

// admin
router.get("/all-enquiry", adminCheck, getAllEnquiry);



module.exports = router;
