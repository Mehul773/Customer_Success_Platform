const Project = require("../models/projectModel");
const Phase = require("../models/phaseModel");

// CREATE RISK
const createPhase = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const {
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const phaseDoc = await Phase.create({
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    });

    // ADD PHASE ID TO PROJECT TABLE
    projectDoc?.project_phases?.push(phaseDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Phase created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE RISK
const deletePhase = async (req, res, next) => {
  try {
    const { project_id, phase_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the phase with the specified phase_id
    projectDoc.project_phases = projectDoc.project_phases.filter(
      (phase) => phase.toString() !== phase_id
    );

    // Save the updated project document
    await projectDoc.save();
    await Phase.deleteOne({ _id: phase_id });

    return res.status(200).json({ message: "Phase deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT RISK
const editPhase = async (req, res, next) => {
  try {
    const {
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    } = req.body;
    const { phase_id } = req.params;
    const phaseDoc = await Phase.findOne({ _id: phase_id });

    if (!phaseDoc) {
      return res.status(409).json({ message: "Phase does not exist" });
    }

    await phaseDoc.set({
      title,
      startDate,
      completionDate,
      approvalDate,
      status,
      revisedCompletionDate,
      comments,
    });

    await phaseDoc.save();
    return res.status(200).json({ message: "Phase edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createPhase, deletePhase, editPhase };
