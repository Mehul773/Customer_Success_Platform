const Project = require("../models/projectModel");
const Mom = require("../models/momModel");

// CREATE MOM
const createMom = async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const { date, duration, link, comments } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }

    const momDoc = await Mom.create({
      date,
      duration,
      link,
      comments,
    });

    // ADD RESOURCE ID TO PROJECT TABLE
    projectDoc?.project_mom?.push(momDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Mom created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE RESOURCE
const deleteMom = async (req, res, next) => {
  try {
    const { project_id, mom_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the mom with the specified mom_id
    projectDoc.project_mom = projectDoc.project_mom.filter(
      (mom) => mom.toString() !== mom_id
    );

    // Save the updated project document
    await projectDoc.save();
    await Mom.deleteOne({ _id: mom_id });

    return res.status(200).json({ message: "Mom deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT RESOURCE
const editMom = async (req, res, next) => {
  try {
    const { date, duration, link, comments } = req.body;
    const { mom_id } = req.params;
    const momDoc = await Mom.findOne({ _id: mom_id });

    if (!momDoc) {
      return res.status(409).json({ message: "Mom does not exist" });
    }

    await momDoc.set({
      date,
      duration,
      link,
      comments,
    });

    await momDoc.save();
    return res.status(200).json({ message: "Mom edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createMom, deleteMom, editMom };
