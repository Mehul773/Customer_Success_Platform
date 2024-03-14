const Project = require("../models/projectModel");
const ProjectUpdate = require("../models/projectUpdateModel");

// CREATE PROJECT UPDATE
const createProjectUpdate = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { date, updates } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const projectUpdateDoc = await ProjectUpdate.create({
      date,
      updates,
    });

    // ADD PROJECT UPDATE ID TO PROJECT TABLE
    projectDoc?.project_projectUpdates?.push(projectUpdateDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "ProjectUpdate created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE PROJECT UPDATE
const deleteProjectUpdate = async (req, res, next) => {
  try {
    const { project_id, projectUpdate_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the projectUpdate with the specified projectUpdate_id
    projectDoc.project_projectUpdates =
      projectDoc.project_projectUpdates.filter(
        (projectUpdate) => projectUpdate.toString() !== projectUpdate_id
      );

    // Save the updated project document
    await projectDoc.save();
    await ProjectUpdate.deleteOne({ _id: projectUpdate_id });

    return res
      .status(200)
      .json({ message: "ProjectUpdate deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT PROJECT UPDATE
const editProjectUpdate = async (req, res, next) => {
  try {
    const { date, updates } = req.body;
    const { projectUpdate_id } = req.params;
    const projectUpdateDoc = await ProjectUpdate.findOne({
      _id: projectUpdate_id,
    });

    if (!projectUpdateDoc) {
      return res.status(409).json({ message: "ProjectUpdate does not exist" });
    }

    await projectUpdateDoc.set({
      date,
      updates,
    });

    await projectUpdateDoc.save();
    return res
      .status(200)
      .json({ message: "ProjectUpdate edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = {
  createProjectUpdate,
  deleteProjectUpdate,
  editProjectUpdate,
};
