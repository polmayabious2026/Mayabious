const express = require("express");

const router = express.Router();

const {
  addServiceSubCategory,
 getServiceSubCategories,
  getServiceSubCategoryById,
  updateServiceSubCategory,
  deleteServiceSubCategory ,
} = require("../controller/servicesubcategory.con");

router.post("/add-subcategory", addServiceSubCategory);
router.get("/getall-subcategory", getServiceSubCategories);
router.get("/get-singlesubcategory/:id", getServiceSubCategoryById);

router.put("/update-subcategory/:id", updateServiceSubCategory);
router.delete("/delete-subcategory/:id",deleteServiceSubCategory );

module.exports = router;