const express = require("express");
const router = express.Router();

const {
  createHomeImageGallery,
  getHomeImageGallery,
  getSingleHomeImageGallery,
  updateHomeImageGallery,
  deleteHomeImageGallery,
} = require("../controller/home.image.gallery.con");

const uploadImage = require("../middleware/fileupload_image");

router.post(
  "/home-image-gallery",
  uploadImage.single("image"),
  createHomeImageGallery,
);

router.get("/get-home-image-gallery", getHomeImageGallery);

router.get("/getsingle-home-image-gallery/:id", getSingleHomeImageGallery);

router.put(
  "/update-home-image-gallery/:id",
  uploadImage.single("image"),
  updateHomeImageGallery,
);

router.delete("/delete-home-image-gallery/:id", deleteHomeImageGallery);

module.exports = router;
