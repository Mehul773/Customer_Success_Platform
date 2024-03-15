const nodemailer = require("nodemailer");
const Project = require("../models/projectModel");
const { generateAuditHistoryHtml } = require("./generateProjectHtml");

const sendMailToAll = async (project_id) => {
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
    .populate("project_version_history")
    .populate("project_users");

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
  projectDoc[0]?.project_users.map((user) => {
    if (user.role == "Client") {
      clients.push({
        name: user.name,
        email: user.email,
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
        `\n\nCheckout our website ${process.env.CLIENT_URL}\n\n` +
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
};

const emailCreateUser = async (project_id) => {
  const projectDoc = await Project.find({ _id: project_id }).populate(
    "project_users"
  );

  if (!projectDoc) {
    return res.status(409).json({ message: "Project does not exists" });
  }

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
  projectDoc[0]?.project_users.map((user) => {
    if (user.role == "Client") {
      clients.push({
        name: user?.name || user.email.split("@")[0],
        email: user.email,
      });
    }
  });

  clients.forEach(async (client) => {
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: client.email,
      subject: `Selected as Project Client`,
      text: `Hello ${client.name},\n\nCongratulations! You've been selected as a client for our project ${projectDoc[0].project_name}.\n\nWe're thrilled to have you on board and look forward to collaborating closely with you to achieve our goals.\n\nCheckout our website ${process.env.CLIENT_URL}\n\nThanks and Regards,\nPromact Infotech Pvt Ltd`,
    };
    // await transporter.sendMail(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};
module.exports = { sendMailToAll, emailCreateUser };
