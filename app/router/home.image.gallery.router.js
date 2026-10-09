const express = require("express");
const router = express.Router();

const adminCheck = require("../middleware/admin_check");

const {
  createHomeImageGallery,
  getHomeImageGallery,
  getSingleHomeImageGallery,
  updateHomeImageGallery,
  deleteHomeImageGallery,
  deleteHomeImageGalleryBigImage,
} = require("../controller/home.image.gallery.con");

const uploadImage = require("../middleware/fileupload_image");

router.post(
  "/home-image-gallery",
  uploadImage.fields([
    {
      name: "small_image",
      maxCount: 1,
    },
    {
      name: "content_image",
      maxCount: 1,
    },
    {
      name: "big_image",
      maxCount: 20,
    },
  ]),
  // adminCheck,
  createHomeImageGallery,
);

// router.get("/get-home-image-gallery", getHomeImageGallery);

router.get(
  "/getsingle-home-image-gallery/:id",
  // adminCheck,
  getSingleHomeImageGallery,
);

router.put("/update-home-image-gallery/:id",uploadImage.fields([{
      name: "small_image",
      maxCount: 1,
    },
    {
      name: "content_image",
      maxCount: 1,
    },,
    {
      name: "big_image",
      maxCount: 20,
    },
  ]),
  adminCheck,
  updateHomeImageGallery,
);

router.delete(
  "/delete-home-image-gallery/:id",
  adminCheck,
  deleteHomeImageGallery,
);


router.delete(
  "/delete-home-image-gallery-big-image/:id",
  adminCheck,
  deleteHomeImageGalleryBigImage
);


// frontend
router.get("/get-home-image-gallery", getHomeImageGallery);

module.exports = router;
