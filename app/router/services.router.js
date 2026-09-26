const express = require("express");
const router = express.Router();

const {
  createServices,
  getallServices,
  getSingleServices,
  updateServices,
  deleteServices,
} = require("../controller/services.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/services", uploadImage.array("image", 20), createServices);

router.get("/getall-services", getallServices);

router.get("/getsingle-services/:id", getSingleServices);

router.put("/update-services/:id", uploadImage.array("image", 20), updateServices);

router.delete("/delete-services/:id", deleteServices);

module.exports = router;
