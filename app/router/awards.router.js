const express = require("express");

const router = express.Router();

const {
    addAwards,
    getAwards,
    getSingleAwards,
    updateAwards,
    deleteAwards
} = require("../controller/awards.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/add-awards", uploadImage.single("image"), addAwards);
router.get("/get-awards", getAwards);
router.get("/get-singleawards/:id", getSingleAwards);
router.put("/update-awards/:id",uploadImage.single("image"),updateAwards);
router.delete("/delete-awards/:id", deleteAwards);

module.exports = router;