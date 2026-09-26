const express = require("express");
const router = express.Router();

const {
  addTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
} = require("../controller/team.con");

const upload = require("../middleware/fileupload_image");

router.post("/add-team", upload.single("image"), addTeam);

router.get("/all-team", getAllTeam);

router.get("/get-singleteam/:id", getSingleTeam);

router.put("/update-team/:id", upload.single("image"), updateTeam);

router.delete("/delete-team/:id", deleteTeam);

module.exports = router;
