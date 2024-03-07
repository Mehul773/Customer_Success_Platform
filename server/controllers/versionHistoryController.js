const Project = require("../models/projectModel");
const VersionHistory = require("../models/versionHistoryMOdel");

// CREATE VERSION HISTORY
const createVersionHistory = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const {
      no,
      type,
      change,
      changeReason,
      createdBy,
      revisionDate,
      approvalDate,
      approvedBy,
    } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this Version" });
    }

    const versionHistoryDoc = await VersionHistory.create({
      no,
      type,
      change,
      changeReason,
      createdBy,
      revisionDate,
      approvalDate,
      approvedBy,
    });

    // ADD VERSION HISTORY ID TO PROJECT TABLE
    projectDoc?.project_version_history?.push(versionHistoryDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Version History created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE VERSION HISTORY
const deleteVersionHistory = async (req, res, next) => {
  try {
    const { project_id, versionHistory_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    //Remove from project table
    projectDoc.project_version_history =
      projectDoc.project_version_history.filter(
        (version) => version.toString() !== versionHistory_id
      );

    // Save the updated project document
    await projectDoc.save();
    await VersionHistory.deleteOne({ _id: versionHistory_id });

    return res
      .status(200)
      .json({ message: "VersionHistory deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT VERSION HISTORY
const editVersionHistory = async (req, res, next) => {
  try {
    const {
      no,
      type,
      change,
      changeReason,
      createdBy,
      revisionDate,
      approvalDate,
      approvedBy,
    } = req.body;
    const { versionHistory_id } = req.params;
    const versionHistoryDoc = await VersionHistory.findOne({
      _id: versionHistory_id,
    });

    if (!versionHistoryDoc) {
      return res
        .status(409)
        .json({ message: "Version History does not exist" });
    }

    await versionHistoryDoc.set({
      no,
      type,
      change,
      changeReason,
      createdBy,
      revisionDate,
      approvalDate,
      approvedBy,
    });
    versionHistoryDoc.save();
    return res
      .status(200)
      .json({ message: "VersionHistory edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = {
  createVersionHistory,
  deleteVersionHistory,
  editVersionHistory,
};
