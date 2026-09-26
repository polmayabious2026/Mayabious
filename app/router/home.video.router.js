const express = require("express");
const router = express.Router();
const uploadVideo = require("../middleware/fileupload_video");

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

router.post("/add-video", uploadVideo.array("video", 10), addVideo);
router.get("/getall-video", getallVideo);
router.get("/getsingle-video/:id", getSingleVideo);
router.put("/update-video/:id", uploadVideo.single("video"), updateVideo);
router.delete("/delete-video/:id", deleteVideo);

module.exports = router;
