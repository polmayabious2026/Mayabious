const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const {
  addNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
} = require("../controller/news.con");

const upload = require("../middleware/fileupload_image");

router.post("/add_news", upload.single("image"),adminCheck, addNews);

router.get("/all_news", getAllNews);

router.get("/get_singlenews/:id",adminCheck, getSingleNews);

router.put("/update_news/:id", upload.single("image"),adminCheck, updateNews);

router.delete("/delete_news/:id",adminCheck, deleteNews);

module.exports = router;
