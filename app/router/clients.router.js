const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const{
  addClients,
  getallclients,
  getSingleclients,
  updateClients,
  deleteClients,
} = require("../controller/clients.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/add-clients", uploadImage.single("logo"),adminCheck, addClients);
router.get("/get-clients", getallclients);
router.get("/get-singleclients/:id",adminCheck, getSingleclients);
router.put("/update-clients/:id",uploadImage.single("logo"),adminCheck,updateClients);
router.delete("/delete-clients/:id", adminCheck,deleteClients);

module.exports = router;