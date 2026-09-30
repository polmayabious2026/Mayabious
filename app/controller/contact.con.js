const Contact = require("../model/contact.model");

// Create Contact
const createContact = async (req, res) => {
  try {
    const {
      phone,
      email,
      office_hours,
      facebook,
      linkedin,
      twitter,
      instagram,
      status,
    } = req.body;

    const contact = await Contact.create({
      phone,
      email,
      office_hours,
      facebook,
      linkedin,
      twitter,
      instagram,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Create Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create contact",
      error: error.message,
    });
  }
};

// Get All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    const {
      phone,
      email,
      office_hours,
      facebook,
      linkedin,
      twitter,
      instagram,
      status,
    } = req.body;

    await contact.update({
      phone,
      email,
      office_hours,
      facebook,
      linkedin,
      twitter,
      instagram,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Update Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update contact",
      error: error.message,
    });
  }
};

// Delete Contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await contact.destroy();

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
