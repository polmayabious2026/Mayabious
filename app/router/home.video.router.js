const express = require("express");
const router = express.Router();
const uploadVideo = require("../middleware/fileupload_video");
const adminCheck = require("../middleware/admin_check")

const {
  addVideo,
  getallVideo,
  getSingleVideo,
  updateVideo,
  deleteVideo,
} = require("../controller/home.video.con");

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Running Fine",
  });
});

router.post("/add-video", uploadVideo.array("video", 10),adminCheck, addVideo);
router.get("/getall-video", getallVideo);
router.get("/getsingle-video/:id",adminCheck, getSingleVideo);
router.put("/update-video/:id", uploadVideo.single("video"),adminCheck, updateVideo);
router.delete("/delete-video/:id",adminCheck, deleteVideo);

module.exports = router;
