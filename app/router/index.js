const express = require("express")
const router = express.Router()

const adminCheck = require("../middleware/admin_check")

// ADMIN
router.use("/admin",require("../router/admin.router"))
// homevideo
router.use("/admin",adminCheck,require("../router/home.video.router"))
// categoty
router.use("/admin",adminCheck,require("../router/servicecategory.router"))
// sub_category
router.use("/admin",adminCheck,require("../router/servicesubcategory.router"))
// homeImageGallery
router.use("/admin",adminCheck,require("../router/home.image.gallery.router"))
// services
router.use("/admin",adminCheck,require("../router/services.router"))
// awards
router.use("/admin",adminCheck,require("../router/awards.router"))
// clients
router.use("/admin",adminCheck,require("../router/clients.router"))
// team
router.use("/admin",adminCheck,require("../router/team.router"))
// news
router.use("/admin",adminCheck,require("../router/news.router"))
// blog
router.use("/admin",adminCheck,require("../router/blog.router"))
// career
router.use("/admin",adminCheck,require("../router/career.router"))
// contact
router.use("/admin",adminCheck,require("../router/contact.router"))

module.exports= router