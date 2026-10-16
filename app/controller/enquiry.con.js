const enquiry = require("../model/enquiry.model");

const nodemailer = require("nodemailer");

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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "noreply.madhyadesign@gmail.com",
        pass: "jjsz kwgw swxf wueq",
      },
    });

  //   const customerMailOptions = {
  //     from: `"Mayabious Team" <noreply.madhyadesign@gmail.com>`,
  //     to: email.trim(),
  //     subject: "Thank You for Contacting Mayabious",

  //     html: `
  //   <div style="margin:0; padding:30px 10px; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  //     <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">

  //       <div style="background:#172554; padding:25px 30px; text-align:center;">
  //         <h1 style="margin:0; color:#ffffff; font-size:24px;">Mayabious</h1>
  //         <p style="margin:8px 0 0; color:#dbeafe; font-size:13px;">
  //           Thank you for reaching out to us
  //         </p>
  //       </div>

  //       <div style="padding:30px; color:#374151; font-size:15px; line-height:1.8;">
  //         <p>Dear ${name},</p>

  //         <p>
  //           Thank you for contacting <strong>Mayabious</strong>.
  //           We have successfully received your enquiry and appreciate
  //           your interest in our services.
  //         </p>

  //         <p>
  //           Our team will review your enquiry and get back to you
  //           as soon as possible.
  //         </p>

  //         <p>
  //           Thank you for considering Mayabious. We look forward
  //           to connecting with you.
  //         </p>

  //         <p>
  //           Best regards,<br/>
  //           <strong>Team Mayabious</strong>
  //         </p>
  //       </div>

  //       <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:18px; text-align:center; color:#6b7280; font-size:12px;">
  //         &copy; ${new Date().getFullYear()} Mayabious. All rights reserved.
  //       </div>

  //     </div>
  //   </div>
  // `,
  //   };

    const contactusMailOptions = {
      from: `"Mayabious Website" <noreply.madhyadesign@gmail.com>`,
      to: "contactus@mayabious.com,digital.marketing@mayabious.com",
      // to: "web@mayabious.com,pol.sarkar.mayabious@gmail.com",
      replyTo: email.trim(),
      subject: `New Mayabious Enquiry - ${name}`,

      html: `
    <div style="font-family:Arial, Helvetica, sans-serif; max-width:650px; margin:20px auto; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; color:#374151; line-height:1.7;">

      <div style="background:#172554; padding:24px; color:#ffffff;">
        <h2 style="margin:0;">New Website Enquiry</h2>
        <p style="margin:8px 0 0; color:#dbeafe;">
          Mayabious Website Notification
        </p>
      </div>

      <div style="padding:28px;">
        <p>Hello Team,</p>

        <p>
          A new enquiry has been submitted through the Mayabious website.
          Please find the details below.
        </p>

        <h3 style="color:#111827; border-bottom:1px solid #e5e7eb; padding-bottom:10px;">
          Enquiry Details
        </h3>

        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:10px; border-bottom:1px solid #e5e7eb;"><strong>Name</strong></td>
            <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px; border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td>
            <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${email}</td>
          </tr>
          <tr>
            <td style="padding:10px; border-bottom:1px solid #e5e7eb;"><strong>Phone</strong></td>
            <td style="padding:10px; border-bottom:1px solid #e5e7eb;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:10px; vertical-align:top;"><strong>Message</strong></td>
            <td style="padding:10px; white-space:pre-wrap; overflow-wrap:anywhere;">${message}</td>
          </tr>
        </table>

        <p style="margin-top:24px;">
          Please review this enquiry and follow up with the customer
          as appropriate.
        </p>

        <p>
          Best regards,<br/>
          <strong>Mayabious Website</strong>
        </p>
      </div>

      <div style="background:#f9fafb; padding:16px; text-align:center; font-size:12px; color:#6b7280; border-top:1px solid #e5e7eb;">
        Automated enquiry notification. Please handle customer information confidentially.
      </div>

    </div>
  `,
    };

    // Send both emails
    await Promise.all([
      // transporter.sendMail(customerMailOptions),
      transporter.sendMail(contactusMailOptions),
    ]);

    return res.status(201).json({
      status: true,
      message: "Enquiry submitted and mail sent successfully ",
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
const getAllEnquiry = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      100
    );


    const offset = (page - 1) * limit;


    const { count, rows } = await enquiry.findAndCountAll({
      order: [["id", "ASC"]],
      limit,
      offset,
    });


    const totalPages = Math.ceil(count / limit);


    return res.status(200).json({
      status: true,
      message: "All Enquiry fetched successfully",
      data: rows,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("getAllEnquiry:", error);


    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports = { createEnquiry,
getAllEnquiry
    
};
