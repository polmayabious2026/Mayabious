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



router.put("/updatecontact/:id", adminCheck,updateContact);

router.delete("/deletecontact/:id", adminCheck,deleteContact);

// frontend
router.get("/getcontact", getAllContacts);

module.exports = router;
