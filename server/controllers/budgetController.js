const Budget = require("../models/budgetModel");
const Project = require("../models/projectModel");

//CREATE BUDGET
const createBudget = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { type, duration, budgetedHours } = req.body;
    const projectDoc = await Project.findOne({ _id: project_id });

    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not fount for this budget" });
    }

    const budgetDoc = await Budget.create({
      type,
      duration,
      budgetedHours,
    });

    //ADD BUDGET ID IN PROJECT TABLE
    projectDoc.project_budget.push(budgetDoc._id);
    projectDoc.save();

    return res.status(200).json({ message: "Budget created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

//DELETE BUDGET
const deleteBudget = async (req, res, next) => {
  const { project_id, budget_id } = req.params;
  const projectDoc = await Project.findById({ _id: project_id });
  if (!projectDoc) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Remove the budget with the specified budget_id
  projectDoc.project_budget = projectDoc.project_budget.filter(
    (budget) => budget._id.toString() !== budget_id
  );

  // Save the updated project document
  await projectDoc.save();
  await Budget.deleteOne({ _id: budget_id });

  return res.status(200).json({ message: "Budget deleted successfully" });
};

//EDIT BUDGET
const editBudget = async (req, res, next) => {
  try {
    const { type, duration, budgetedHours } = req.body;

    const { budget_id } = req.params;
    const budgetDoc = await Budget.findOne({ _id: budget_id });

    if (!budgetDoc) {
      return res.status(409).json({ message: "Budget does not exists" });
    }
    await budgetDoc.set({
      type,
      duration,
      budgetedHours,
    });
    await budgetDoc.save();
    return res.status(200).json({ message: "Budget edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

module.exports = { createBudget, deleteBudget, editBudget };
