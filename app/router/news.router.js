const express = require("express");
const router = express.Router();

const {
  addNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
} = require("../controller/news.con");

const upload = require("../middleware/fileupload_image");

router.post("/add_news", upload.single("image"), addNews);

router.get("/all_news", getAllNews);

router.get("/get_singlenews:id", getSingleNews);

router.put("/update_news/:id", upload.single("image"), updateNews);

router.delete("/delete_news/:id", deleteNews);

module.exports = router;
