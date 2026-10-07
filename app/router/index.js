const express = require("express")
const router = express.Router()



// ADMIN
router.use("/admin",require("../router/admin.router"))
// homevideo
router.use("/admin",require("../router/home.video.router"))
// categoty
router.use("/admin",require("../router/servicecategory.router"))
// sub_category
router.use("/admin",require("../router/servicesubcategory.router"))
// homeImageGallery
router.use("/admin",require("../router/home.image.gallery.router"))
// services
router.use("/admin",require("../router/services.router"))
// awards
router.use("/admin",require("../router/awards.router"))
// clients
router.use("/admin",require("../router/clients.router"))
// team
router.use("/admin",require("../router/team.router"))
// news
router.use("/admin",require("../router/news.router"))
// blog
router.use("/admin",require("../router/blog.router"))
// career
router.use("/admin",require("../router/career.router"))
// contact
router.use("/admin",require("../router/contact.router"))
// enquiry
router.use("/admin",require("../router/enquiry.router"))




module.exports= router