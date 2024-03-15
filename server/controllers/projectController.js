const Project = require("../models/projectModel");
const User = require("../models/userModel");

// CREATE PROJECT
const createProject = async (req, res, next) => {
  try {
    const { project_name, project_desc, project_scope, project_stack } =
      req.body;
    const projectExists = await Project.findOne({ project_name });

    if (projectExists) {
      return res.status(409).json({ message: "Project already exists" });
    }

    const projectDoc = await Project.create({
      project_name,
      project_desc,
      project_scope,
      project_stack,
    });

    return res.status(200).json({ message: "Project created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

//DISPLAY ALL PROJECTS
const displayProjects = async (req, res, next) => {
  const { user_id } = req.params;

  const userDoc = await User.findOne({ _id: user_id });
  if (!userDoc) {
    return res.status(409).json({ message: "user does not exist" });
  }

  try {
    let projects;
    if (userDoc.role === "Client" || userDoc.role === "PM") {
      projects = await Project.find({
        project_users: { $elemMatch: { $eq: user_id } },
      });
    } else {
      projects = await Project.find({});
    }

    if (projects) {
      return res.status(200).json(projects);
    } else {
      return res.json({ message: "projects not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

//DELETE PROJECT
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const projectDoc = await Project.findById(id);
  if (!projectDoc) {
    return res.status(404).json({ message: "Project not found" });
  }

  await Project.deleteOne({ _id: id });
  return res.status(200).json({ message: "Project deleted successfully" });
};

//EDIT PROJECT
const editProject = async (req, res, next) => {
  try {
    const {
      project_id,
      project_name,
      project_desc,
      project_scope,
      project_stack,
      project_status,
      project_manager,
      _id,
    } = req.body;
    const projectDoc = await Project.findOne({ _id: project_id });

    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exists" });
    }
    await projectDoc.set({
      project_name,
      project_desc,
      project_scope,
      project_stack,
      project_status,
      project_manager,
    });
    await projectDoc.save();
    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

//FETCH ONE PROJECT - THIS API FETCH ALL DETAILS ABOUT PROJECT LIKE BUDGET, AUDIT HISTORY AND MANY MORE
const fetchOneProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const projectDoc = await Project.findById(id)
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
      .populate("project_users")
      .populate("project_resources")
      .populate("project_clientFeedback")
      .populate("project_projectUpdates")
      .populate("project_mom");
    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exists" });
    }
    return res.status(200).json(projectDoc);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
  fetchOneProject,
};
