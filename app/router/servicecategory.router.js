const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const {
  addServiceCategory,
  getServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
} = require("../controller/servicecategory.con");

router.post("/add-category",adminCheck, addServiceCategory);
router.get("/getall-category", getServiceCategories);
router.get("/get-singlecategory/:id",adminCheck, getServiceCategoryById);
router.put("/update-category/:id",adminCheck, updateServiceCategory);
router.delete("/delete-category/:id",adminCheck, deleteServiceCategory);

module.exports = router;