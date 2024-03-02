const nodemailer = require("nodemailer");

const sendMailToAll = async (req, res) => {
  //  Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email provider details here
    service: "Gmail",
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_PASS,
    },
  });

  //   Take dummy data now
  const users = [
    { email: "chovatiyamehul2003@gmail.com", name: "Mehul" },
    { email: "mgchovatiya2003@gmail.com", name: "Sagar" },
  ];
  // Send email to the all clients
  users.map((user) => {
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: user.email,
      subject: "Project details",
      text: `Hello ${user.name},\n

      Please note that audit has been completed and here is the audit summary:\n
      [Audit History Table Row Updated]
      
      Thanks and Regards,\n
      Promact Infotech Pvt Ltd
      `,
    };
    transporter.sendMail(mailOptions);
  });

  res.status(200).json({ message: "Email sent successfully" });
};

module.exports = { sendMailToAll };
