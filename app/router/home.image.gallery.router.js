const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware/admin_check")
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
  adminCheck,
  createHomeImageGallery,
);

router.get("/get-home-image-gallery", getHomeImageGallery);

router.get("/getsingle-home-image-gallery/:id",adminCheck, getSingleHomeImageGallery);

router.put(
  "/update-home-image-gallery/:id",
  uploadImage.single("image"),
  adminCheck,
  updateHomeImageGallery,
);

router.delete("/delete-home-image-gallery/:id",adminCheck, deleteHomeImageGallery);

module.exports = router;
