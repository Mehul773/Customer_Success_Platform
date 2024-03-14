const Project = require("../models/projectModel");
const Resource = require("../models/resourceModel");

// CREATE RESOURCE
const createResource = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { resourceName, role, startDate, endDate, comments } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const resourceDoc = await Resource.create({
      resourceName,
      role,
      startDate,
      endDate,
      comments,
    });

    // ADD RESOURCE ID TO PROJECT TABLE
    projectDoc?.project_resources?.push(resourceDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Resource created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE RESOURCE
const deleteResource = async (req, res, next) => {
  try {
    const { project_id, resource_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the resource with the specified resource_id
    projectDoc.project_resources = projectDoc.project_resources.filter(
      (resource) => resource.toString() !== resource_id
    );

    // Save the updated project document
    await projectDoc.save();
    await Resource.deleteOne({ _id: resource_id });

    return res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT RESOURCE
const editResource = async (req, res, next) => {
  try {
    const { resourceName, role, startDate, endDate, comments } = req.body;
    const { resource_id } = req.params;
    const resourceDoc = await Resource.findOne({ _id: resource_id });

    if (!resourceDoc) {
      return res.status(409).json({ message: "Resource does not exist" });
    }

    await resourceDoc.set({
      resourceName,
      role,
      startDate,
      endDate,
      comments,
    });

    await resourceDoc.save();
    return res.status(200).json({ message: "Resource edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createResource, deleteResource, editResource };
