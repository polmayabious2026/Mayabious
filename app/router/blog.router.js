const express = require("express");

const router = express.Router();

const {
  createBlog,
  getallBlog,
  getsingleBlog,
  updateBllog,
  deleteBlog,
} = require("../controller/blog.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/add-blogs", uploadImage.single("image"),  createBlog);
router.get("/get-blogs",getallBlog);
router.get("/get-singleblogs/:id", getsingleBlog);
router.put("/update-blogs/:id",uploadImage.single("image"),updateBllog);
router.delete("/delete-blogs/:id", deleteBlog);

module.exports = router;