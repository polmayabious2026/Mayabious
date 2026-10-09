const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware/admin_check");
const {
  createServices,
  getallServices,
  getSingleServices,
  updateServices,
  deleteServices,
  getAllServicesForFilter,
} = require("../controller/services.con");

const uploadImage = require("../middleware/fileupload_image");

router.post(
  "/services",
  uploadImage.fields([
    { name: "small_image", maxCount: 50 },
    { name: "big_image", maxCount: 50 },
  ]),
  adminCheck,
  createServices,
);

router.get("/getall-services", getallServices);

router.get("/getsingle-services/:id", adminCheck, getSingleServices);

router.put(
  "/update-services/:id",
  uploadImage.fields([
    { name: "small_image", maxCount: 1 },
    { name: "big_image", maxCount: 1 },
  ]),
  adminCheck,
  updateServices,
);

router.delete("/delete-services/:id", adminCheck, deleteServices);

router.get("/getall-services-for-filter", getAllServicesForFilter);

module.exports = router;
