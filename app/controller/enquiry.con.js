const enquiry = require("../model/enquiry.model");

const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide name",
      });
    }

    if (!email || !String(email).trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide email",
      });
    }

    if (!phone || !String(phone).trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide phone",
      });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        status: false,
        message: "Please provide message",
      });
    }

    const addCandidate = await enquiry.create({
      name: name,
      email: email,
      phone: phone,
      message: message ?? null,
    });

    return res.status(201).json({
      status: true,
      message: "Enquiry created successfully",
      data: addCandidate,
    });
  } catch (error) {
    console.log("createEnquiry:", error);
    return res.status(400).json({
      status: false,
      message: "Something Went wrong",
      error: error.message,
    });
  }
};

module.exports={createEnquiry}