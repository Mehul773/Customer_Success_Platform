const nodemailer = require("nodemailer");
const Project = require("../models/projectModel");
const { generateAuditHistoryHtml } = require("./generateProjectHtml");

const sendMailToAll = async (req, res) => {
  const { project_id } = req.params;

  const projectDoc = await Project.find({ _id: project_id })
    .populate("project_budget")
    .populate("project_risks")
    .populate("project_phases")
    .populate("project_sprints")
    .populate("project_stackholder")
    .populate("project_audit_history")
    .populate("project_operational_matrix")
    .populate("project_financial_matrix")
    .populate("project_technical_matrix")
    .populate("project_version_history");

  if (!projectDoc) {
    return res.status(409).json({ message: "Project does not exists" });
  }

  const htmlContent = generateAuditHistoryHtml(projectDoc);

  //  Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email provider details here
    service: "Gmail",
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_PASS,
    },
  });

  let clients = [];
  projectDoc[0]?.project_stackholder.map((user) => {
    if (user.role == "Client") {
      clients.push({
        name: user.name,
        email: user.contact,
      });
    }
  });

  clients.forEach((client) => {
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: client.email,
      subject: "Project Details",
      html:
        "<p>Hello " +
        client.name +
        ",</p><p>Please note that audit has been changed and here is the audit summary:</p>" +
        htmlContent +
        "<p>Thanks and Regards,</p><p>Promact Infotech Pvt Ltd</p>",
      text: `Hello ${client.name},\n\nPlease note that audit has been completed and here is the audit summary:\n\n\nThanks and Regards,\nPromact Infotech Pvt Ltd`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
  res
    .status(200)
    .json({ message: "Audit history changed. Email sent successfully" });
};

module.exports = { sendMailToAll };
