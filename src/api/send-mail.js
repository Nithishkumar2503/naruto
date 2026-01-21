import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  console.log("hitted...");
  () => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed!" });
    }
  };

  const { name, email, message, phone, subject } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  try {
    // 1️⃣ Send email to sender (user)
    await transporter.sendMail(
      handleMailOptionData({ name, email, message, phone, subject })
    );

    // 2️⃣ Send email to receiver (admin)
    const mailToAdmin = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // your email
      subject: "New Contact Form Submission",
      text: `New message received from ${name} (${email}, Phone: ${phone}):

${message}`,
    };
    await transporter.sendMail(mailToAdmin);

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending emails:", err);
    res.json({ success: false, errorMessage: err.message });
  }
}

function handleMailOptionData(params) {
  const { name, email, message, phone, subject } = params;

  let mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Subject: Re: Trip with sign",
    text: "Happy to See you.",
    html: `
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Confirmation</title>
  </head>
  <body
    style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;"
  >
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="background-color: #f4f4f4; padding: 20px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="
                  background-color:#e53e3e;
                  padding: 20px;
                  color: #ffffff;
                  font-size: 24px;
                  font-weight: bold;
                "
              >
                Thank You for Contacting Us!
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px 20px; color: #333333; font-size: 16px;">
                <p style="margin: 0 0 16px;">
                  Hi <strong>${name}</strong>,
                </p>
                <p style="margin: 0 0 16px; line-height: 1.6;">
                  Thank you for reaching out to us! We’ve successfully received
                  your message and our team will get back to you as soon as
                  possible.
                </p>
                <p style="margin: 0 0 16px; line-height: 1.6;">
                  Meanwhile, feel free to explore our services and resources. We
                 ’re here to help you succeed.
                </p>

                 <p style="margin: 0 0 10px;">
                  Client Details, <br />
                 
                  Email  : ${email} <br />
                  Contact: <a href='tel:+91${phone}'>${phone} </a>  <br />
                  Subject: ${subject}  <br />
                  Message: ${message} <br />
                </p>
                <!-- Button -->
                <p style="margin: 0 0 10px;">
                  Best regards, <br />
                  Ashokkumar  <br />
                  <a href='tel:+916374080040'>6374080040 </a> <br />
                  <a href='tel:+916384044005'>6384044005 </a> <br />
                  <a href='tel:04224690439'>04224690439</a> <br />
                  nithishkumar.shanmugam25@gmail.com
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  background-color: #f4f4f4;
                  padding: 20px;
                  font-size: 13px;
                  color: #777777;
                "
              >
                <p style="margin: 0;">
                  <strong>Trip with Sign Team</strong>
                </p>
                
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `,
  };
  return mailOptions;
}
