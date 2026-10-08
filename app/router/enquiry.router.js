const express = require("express");

const router = express.Router();

const {createEnquiry} = require("../controller/enquiry.con");

// frontend
router.post("/create-enquiry",createEnquiry);



module.exports = router;
