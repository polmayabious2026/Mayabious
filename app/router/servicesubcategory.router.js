const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check");
const {
  addServiceSubCategory,
  getServiceSubCategories,
  getServiceSubCategoryById,
  updateServiceSubCategory,
  deleteServiceSubCategory,
} = require("../controller/servicesubcategory.con");

router.post("/add-subcategory", adminCheck, addServiceSubCategory);

router.get("/get-singlesubcategory/:id", adminCheck, getServiceSubCategoryById);

router.put("/update-subcategory/:id", adminCheck, updateServiceSubCategory);
router.delete("/delete-subcategory/:id", adminCheck, deleteServiceSubCategory);

// frontend
router.get("/getall-subcategory", getServiceSubCategories);

module.exports = router;
