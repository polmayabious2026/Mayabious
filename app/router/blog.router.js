const express = require("express");

const router = express.Router();

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

router.post(
  "/add-blogs",
  uploadImage.fields([
    { name: "small_image", maxCount: 1 },
    { name: "big_image", maxCount: 1 },
  ]),
  createBlog,
);
router.get("/get-blogs", getallBlog);

router.get("/get-singleblogs/:id", getsingleBlog);

router.put(
  "/update-blogs/:id",
  uploadImage.fields([
    { name: "small_image", maxCount: 1 },
    { name: "big_image", maxCount: 1 },
  ]),
  updateBlog,
);
router.delete("/delete-blogs/:id", deleteBlog);


// blogcategory
router.post("/add_blogcategory", addBlogCategory);

router.get("/all_blogcategory", getAllCategory);

router.get("/blogcategory/:id", getSingleCategory);

router.put("/blogcategory/:id", updateBlogCategory);

router.delete("/blogcategory/:id", deleteBlogCategory);


module.exports = router;
