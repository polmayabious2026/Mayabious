const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controller/contact.con");


router.post("/createcontact", createContact);

router.get("/getcontact", getAllContacts);

router.put("/updatecontact/:id", updateContact);

router.delete("/deletecontact/:id", deleteContact);

module.exports = router;
