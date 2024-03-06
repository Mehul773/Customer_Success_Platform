const Project = require("../models/projectModel");
const OperationalMatrix = require("../models/operationalMatrixModel");
const FinancialMatrix = require("../models/financialMatrixModel");
const TechnicalMatrix = require("../models/technicalMatrixModel");

// CREATE Operational Matrix
const createOperationalMatrix = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { level, name } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const operationalMatrixDoc = await OperationalMatrix.create({
      level,
      name,
    });

    // ADD OperationalMatrix ID TO PROJECT TABLE
    projectDoc?.project_operational_matrix?.push(operationalMatrixDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "OperationalMatrix created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE STACKHOLDER
const deleteOperationalMatrix = async (req, res, next) => {
  try {
    const { project_id, operationalMatrix_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the OperationalMatrix with the specified operationalMatrix_id
    projectDoc.project_operational_matrix =
      projectDoc.project_operational_matrix.filter(
        (operationalMatrix) =>
          operationalMatrix.toString() !== operationalMatrix_id
      );

    // Save the updated project document
    await projectDoc.save();
    await OperationalMatrix.deleteOne({ _id: operationalMatrix_id });

    return res
      .status(200)
      .json({ message: "Stackholder deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT STACKHOLDER
const editOperationalMatrix = async (req, res, next) => {
  try {
    const { level, name } = req.body;
    const { operationalMatrix_id } = req.params;
    const operationalMatrixDoc = await OperationalMatrix.findOne({
      _id: operationalMatrix_id,
    });

    if (!operationalMatrixDoc) {
      return res
        .status(409)
        .json({ message: "Operational Matrix does not exist" });
    }

    await operationalMatrixDoc.set({
      level,
      name,
    });

    await operationalMatrixDoc.save();
    return res
      .status(200)
      .json({ message: "Operational Matrix edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};
// CREATE FinancialMatrix
const createFinancialMatrix = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { level, name } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const financialMatrixDoc = await FinancialMatrix.create({
      level,
      name,
    });

    // ADD FinancialMatrix ID TO PROJECT TABLE
    projectDoc?.project_financial_matrix?.push(financialMatrixDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "FinancialMatrix created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE STACKHOLDER
const deleteFinancialMatrix = async (req, res, next) => {
  try {
    const { project_id, financialMatrix_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the FinancialMatrix with the specified financialMatrix_id
    projectDoc.project_financial_matrix =
      projectDoc.project_financial_matrix.filter(
        (financialMatrix) => financialMatrix.toString() !== financialMatrix_id
      );

    // Save the updated project document
    await projectDoc.save();
    await FinancialMatrix.deleteOne({ _id: financialMatrix_id });

    return res
      .status(200)
      .json({ message: "Financial Matrix deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT STACKHOLDER
const editFinancialMatrix = async (req, res, next) => {
  try {
    const { level, name } = req.body;
    const { financialMatrix_id } = req.params;
    const financialMatrixDoc = await FinancialMatrix.findOne({
      _id: financialMatrix_id,
    });

    if (!financialMatrixDoc) {
      return res
        .status(409)
        .json({ message: "Financial Matrix does not exist" });
    }

    await financialMatrixDoc.set({
      level,
      name,
    });

    await financialMatrixDoc.save();
    return res
      .status(200)
      .json({ message: "Financial Matrix edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// CREATE TechnicalMatrix
const createTechnicalMatrix = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { level, name } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const technicalMatrixDoc = await TechnicalMatrix.create({
      level,
      name,
    });

    // ADD TechnicalMatrix ID TO PROJECT TABLE
    projectDoc?.project_technical_matrix?.push(technicalMatrixDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "TechnicalMatrix created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE STACKHOLDER
const deleteTechnicalMatrix = async (req, res, next) => {
  try {
    const { project_id, technicalMatrix_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the TechnicalMatrix with the specified technicalMatrix_id
    projectDoc.project_technical_matrix =
      projectDoc.project_technical_matrix.filter(
        (technicalMatrix) => technicalMatrix.toString() !== technicalMatrix_id
      );

    // Save the updated project document
    await projectDoc.save();
    await TechnicalMatrix.deleteOne({ _id: technicalMatrix_id });

    return res
      .status(200)
      .json({ message: "Technical Matrix deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT STACKHOLDER
const editTechnicalMatrix = async (req, res, next) => {
  try {
    const { level, name } = req.body;
    const { technicalMatrix_id } = req.params;
    const technicalMatrixDoc = await TechnicalMatrix.findOne({
      _id: technicalMatrix_id,
    });

    if (!technicalMatrixDoc) {
      return res
        .status(409)
        .json({ message: "Technical Matrix does not exist" });
    }

    await technicalMatrixDoc.set({
      level,
      name,
    });

    await technicalMatrixDoc.save();
    return res
      .status(200)
      .json({ message: "Technical Matrix edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = {
  createOperationalMatrix,
  deleteOperationalMatrix,
  editOperationalMatrix,
  createFinancialMatrix,
  deleteFinancialMatrix,
  editFinancialMatrix,
  createTechnicalMatrix,
  deleteTechnicalMatrix,
  editTechnicalMatrix,
};
