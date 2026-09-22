const express = require("express");

const router = express.Router();

const {
  addServiceCategory,
  getServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
} = require("../controller/servicecategory.con");

router.post("/add-category", addServiceCategory);
router.get("/getall-category", getServiceCategories);
router.get("/get-singlecategory/:id", getServiceCategoryById);
router.put("/update-category/:id", updateServiceCategory);
router.delete("/delete-category/:id", deleteServiceCategory);

module.exports = router;