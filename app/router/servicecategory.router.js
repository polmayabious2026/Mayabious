const express = require("express");

const router = express.Router();

const adminCheck = require("../middleware/admin_check");
const uploadImage = require("../middleware/fileupload_image");

const {
  addServiceCategory,
  getServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
} = require("../controller/servicecategory.con");

router.post(
  "/add-category",
  uploadImage.single("icon"),
  adminCheck,
  addServiceCategory,
);

router.get("/getall-category", getServiceCategories);

router.get("/get-singlecategory/:id", adminCheck, getServiceCategoryById);

router.put(
  "/update-category/:id",
  uploadImage.single("icon"),
  adminCheck,
  updateServiceCategory,
);

router.delete("/delete-category/:id", adminCheck, deleteServiceCategory);

module.exports = router;
