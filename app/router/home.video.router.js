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
    // homevideoSet
  addhomeVideoSet,
  gethomeVideoSet,
  getSingleHomeVideoSet,
  updatehomeVideoSet,
  deletehomeVideoSet ,
} = require("../controller/home.video.con");

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Running Fine",
  });
});

router.post("/add-video/:homevideoset_id", uploadVideo.array("video", 9),adminCheck, addVideo);
// router.get("/getall-video", getallVideo);
router.get("/getsingle-video/:id",adminCheck, getSingleVideo);
router.put("/update-video/:id", uploadVideo.single("video"),adminCheck, updateVideo);
router.delete("/delete-video/:id",adminCheck, deleteVideo);


// homevideoset
router.post("/add-videoset",adminCheck,addhomeVideoSet);
// router.get("/getall-videoset",  gethomeVideoSet);
router.get("/getsingle-videoset/:id",adminCheck,getSingleHomeVideoSet);
router.put("/update-videoset/:id",adminCheck,  updatehomeVideoSet);
router.delete("/delete-videoset/:id",adminCheck, deletehomeVideoSet);


// frontend
// router.get("/getall-video", getallVideo);
router.get("/getall-videoset",  gethomeVideoSet);

module.exports = router;
