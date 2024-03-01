const Project = require("../models/projectModel");

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

//DISPLAY PROJECT
const displayProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    if (projects) {
      return res.status(200).json(projects);
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
      _id,
    } = req.body;
    console.log(_id);
    const projectDoc = await Project.findOne({ _id: project_id });

    if (!projectDoc) {
      return res.status(409).json({ message: "Project does not exists" });
    }
    await projectDoc.set({
      project_name,
      project_desc,
      project_scope,
      project_stack,
    });
    await projectDoc.save();
    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

module.exports = {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
};
