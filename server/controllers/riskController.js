const Risk = require("../models/riskModel");
const Project = require("../models/projectModel");

// CREATE RISK
const createRisk = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const {
      type,
      description,
      severity,
      impact,
      remedialSteps,
      status,
      closureDate,
    } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this risk" });
    }

    const riskDoc = await Risk.create({
      type,
      description,
      severity,
      impact,
      remedialSteps,
      status,
      closureDate,
    });

    // ADD RISK ID TO PROJECT TABLE
    projectDoc?.project_risks?.push(riskDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Risk created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE RISK
const deleteRisk = async (req, res, next) => {
  try {
    const { project_id, risk_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the risk with the specified risk_id
    projectDoc.project_risks = projectDoc.project_risks.filter(
      (risk) => risk.toString() !== risk_id
    );

    // Save the updated project document
    await projectDoc.save();
    await Risk.deleteOne({ _id: risk_id });

    return res.status(200).json({ message: "Risk deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT RISK
const editRisk = async (req, res, next) => {
  try {
    const {
      type,
      description,
      severity,
      impact,
      remedialSteps,
      status,
      closureDate,
    } = req.body;
    const { risk_id } = req.params;
    const riskDoc = await Risk.findOne({ _id: risk_id });

    if (!riskDoc) {
      return res.status(409).json({ message: "Risk does not exist" });
    }

    await riskDoc.set({
      type,
      description,
      severity,
      impact,
      remedialSteps,
      status,
      closureDate,
    });

    await riskDoc.save();
    return res.status(200).json({ message: "Risk edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createRisk, deleteRisk, editRisk };
