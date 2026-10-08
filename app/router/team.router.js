const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware/admin_check");
const {
  addTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
} = require("../controller/team.con");

const upload = require("../middleware/fileupload_image");

router.post("/add-team", upload.single("image"), adminCheck, addTeam);

router.get("/get-singleteam/:id", adminCheck, getSingleTeam);

router.put("/update-team/:id", upload.single("image"), adminCheck, updateTeam);

router.delete("/delete-team/:id", adminCheck, deleteTeam);

// frontend
router.get("/all-team", getAllTeam);

module.exports = router;
