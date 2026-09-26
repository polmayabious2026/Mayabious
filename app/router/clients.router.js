const express = require("express");

const router = express.Router();

const{
  addClients,
  getallclients,
  getSingleclients,
  updateClients,
  deleteClients,
} = require("../controller/clients.con");

const uploadImage = require("../middleware/fileupload_image");

router.post("/add-clients", uploadImage.single("logo"), addClients);
router.get("/get-clients", getallclients);
router.get("/get-singleclients/:id", getSingleclients);
router.put("/update-clients/:id",uploadImage.single("logo"),updateClients);
router.delete("/delete-clients/:id", deleteClients);

module.exports = router;