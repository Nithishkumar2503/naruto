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

const emailUI = (req) => {
  const { name, phone, email, message } = req;
  return `
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Confirmation</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    "
  >
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
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
                  background-color: #e53e3e;
                  padding: 20px;
                  color: #ffffff;
                  font-size: 22px;
                  font-weight: bold;
                "
              >
                Thank You for Contacting Us!
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td
                style="
                  padding: 30px;
                  color: #333333;
                  font-size: 15px;
                  line-height: 1.6;
                "
              >
                <p style="margin-top: 0;">
                  Hi <strong>${name}</strong>,
                </p>

                <p>
                  Thank you for reaching out to us! We’ve successfully received
                  your message, and our team will get back to you as soon as
                  possible.
                </p>

                <p>
                  Meanwhile, feel free to explore our services and resources.
                  We’re here to help you succeed.
                </p>

                <!-- Client Details -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    margin-top: 20px;
                    background-color: #f9f9f9;
                    border-radius: 6px;
                    padding: 15px;
                  "
                >
                  <tr>
                    <td style="font-size: 14px;">
                      <strong>Client Details</strong><br /><br />
                      <strong>Email:</strong> ${email}<br />
                      <strong>Contact:</strong>
                      <a href="tel:+91${phone}" style="color: #e53e3e;">
                        ${phone}
                      </a><br />
                      <strong>Subject:</strong> ${subject}<br />
                      <strong>Message:</strong> ${message}
                    </td>
                  </tr>
                </table>

                <p style="margin-top: 25px;">
                  Best regards,<br />
                  <strong>Nithish</strong><br />
                  <a
                    href="mailto:nithishkumar.shanmugam25@gmail.com"
                    style="color: #e53e3e; text-decoration: none;"
                  >
                    nithishkumar.shanmugam25@gmail.com
                  </a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  background-color: #f4f4f4;
                  padding: 15px;
                  font-size: 12px;
                  color: #777777;
                "
              >
                <strong>Nithish Team</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


  `;
};

function handleMailOptionData(params) {
  const { email } = params;

  let mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Subject: Re: Hi! Nithish.",
    text: "Happy to See you.",
    html: emailUI(params),
  };
  return mailOptions;
}
