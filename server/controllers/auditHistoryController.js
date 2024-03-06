const Project = require("../models/projectModel");
const AuditHistory = require("../models/auditHistoryModel");
const { sendMailToAll } = require("./emailController");

// CREATE AUDIT HISTORY
const createAuditHistory = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { dateOfAudit, reviewedBy, status, comment, actionItem } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this Audit" });
    }

    const auditHistoryDoc = await AuditHistory.create({
      dateOfAudit,
      reviewedBy,
      status,
      comment,
      actionItem,
    });

    // ADD AUDIT HISTORY ID TO PROJECT TABLE
    projectDoc?.project_audit_history?.push(auditHistoryDoc._id);
    await projectDoc.save();

    //SEND EMAIL WHEN AUDIT IS CREATED
    sendMailToAll(req, res);
    // return res.status(200).json({ message: "AuditHistory created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE AUDIT HISTORY
const deleteAuditHistory = async (req, res, next) => {
  try {
    const { project_id, auditHistory_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Remove from project table
    projectDoc.project_audit_history = projectDoc.project_audit_history.filter(
      (audit) => audit.toString() !== auditHistory_id
    );

    // Save the updated project document
    await projectDoc.save();
    await AuditHistory.deleteOne({ _id: auditHistory_id });

    //SEND EMAIL WHEN AUDIT IS CREATED
    sendMailToAll(req, res);

    // return res
    //   .status(200)
    //   .json({ message: "AuditHistory deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT AUDIT HISTORY
const editAuditHistory = async (req, res, next) => {
  try {
    const { dateOfAudit, reviewedBy, status, comment, actionItem } = req.body;
    const { auditHistory_id } = req.params;
    const auditHistoryDoc = await AuditHistory.findOne({
      _id: auditHistory_id,
    });

    if (!auditHistoryDoc) {
      return res.status(409).json({ message: "AuditHistory does not exist" });
    }

    await auditHistoryDoc.set({
      dateOfAudit,
      reviewedBy,
      status,
      comment,
      actionItem,
    });

    await auditHistoryDoc.save();
    //SEND EMAIL WHEN AUDIT IS CREATED
    sendMailToAll(req, res);
    // return res
    //   .status(200)
    //   .json({ message: "AuditHistory edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createAuditHistory, deleteAuditHistory, editAuditHistory };
