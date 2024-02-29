const Project = require("../models/projectModel");

// CREATE PROJECT
const createProject = async (req, res, next) => {
  console.log("in createProject");
  try {
    const { project_name, project_desc, project_scope, project_stack } =
      req.body;
    const projectExists = await Food.findOne({ project_name });

    if (projectExists) {
      return res.status(409).json({ message: "Project already exists" });
    }

    const projectDoc = await Project.create({
      project_name,
      project_desc,
      project_scope,
      project_stack,
    });

    return res.status(200).json(projectDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

module.exports = {
  createProject,
};
