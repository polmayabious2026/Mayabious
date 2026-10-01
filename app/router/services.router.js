const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const {
  createServices,
  getallServices,
  getSingleServices,
  updateServices,
  deleteServices,
} = require("../controller/services.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/services", uploadImage.array("image", 20),adminCheck, createServices);

router.get("/getall-services", getallServices);

router.get("/getsingle-services/:id",adminCheck, getSingleServices);

router.put("/update-services/:id", uploadImage.array("image", 20),adminCheck, updateServices);

router.delete("/delete-services/:id",adminCheck, deleteServices);

module.exports = router;
