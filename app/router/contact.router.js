const express = require("express");

const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controller/contact.con");


router.post("/createcontact", adminCheck,createContact);

router.get("/getcontact", getAllContacts);

router.put("/updatecontact/:id", adminCheck,updateContact);

router.delete("/deletecontact/:id", adminCheck,deleteContact);

module.exports = router;
