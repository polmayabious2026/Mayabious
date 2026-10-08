const express = require("express");

const router = express.Router();

const adminCheck = require("../middleware/admin_check")

const {
  // blog
  createBlog,
  getallBlog,
  getsingleBlog,
  updateBlog,
  deleteBlog,

  // blogcategory
  addBlogCategory,
  getAllCategory,
  getSingleCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controller/blog.con");

const uploadImage = require("../middleware/fileupload_image");

// blog
router.post(
  "/add-blogs",
  uploadImage.fields([
    { name: "small_image", maxCount: 1 },
    { name: "big_image", maxCount: 1 },
  ]),
  adminCheck,
  createBlog,
);
// router.get("/get-blogs", getallBlog);

router.get("/get-singleblogs/:id",adminCheck, getsingleBlog);

router.put(
  "/update-blogs/:id",
  uploadImage.fields([
    { name: "small_image", maxCount: 1 },
    { name: "big_image", maxCount: 1 },
  ]),
  adminCheck,
  updateBlog,
);
router.delete("/delete-blogs/:id",adminCheck, deleteBlog);


// blogcategory
router.post("/add_blogcategory",adminCheck, addBlogCategory);

router.get("/all_blogcategory",adminCheck, getAllCategory);

router.get("/blogcategory/:id",adminCheck, getSingleCategory);

router.put("/blogcategory/:id",adminCheck, updateBlogCategory);

router.delete("/blogcategory/:id",adminCheck, deleteBlogCategory);

// frontend
router.get("/get-blogs", getallBlog);

module.exports = router;
