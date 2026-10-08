const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check")

const {
    addAwards,
    getAwards,
    getSingleAwards,
    updateAwards,
    deleteAwards
} = require("../controller/awards.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/add-awards",adminCheck, uploadImage.single("image"), addAwards);

router.get("/get-singleawards/:id",adminCheck, getSingleAwards);
router.put("/update-awards/:id",adminCheck,uploadImage.single("image"),updateAwards);
router.delete("/delete-awards/:id",adminCheck, deleteAwards);

// frontend
router.get("/get-awards", getAwards);

module.exports = router;