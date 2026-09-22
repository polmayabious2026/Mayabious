const express = require("express")
const router = express.Router()



router.use("/admin",require("../router/home.video.router"))
router.use("/admin",require("../router/servicecategory.router"))





module.exports= router