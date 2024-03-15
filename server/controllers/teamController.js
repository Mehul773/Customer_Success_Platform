const Project = require("../models/projectModel");
const Team = require("../models/teamModel");

// CREATE TEAM
const createTeam = async (req, res) => {
  try {
    const { project_id } = req.params;
    const {
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    } = req.body;

    const projectDoc = await Project.findOne({ _id: project_id });
    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this team" });
    }

    const teamDoc = await Team.create({
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    });

    // ADD TEAM ID TO PROJECT TABLE
    projectDoc?.project_team?.push(teamDoc._id);
    await projectDoc.save();

    return res.status(200).json({ message: "Team created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// DELETE TEAM
const deleteTeam = async (req, res) => {
  try {
    const { project_id, team_id } = req.params;
    const projectDoc = await Project.findById({ _id: project_id });

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the team with the specified team_id
    projectDoc.project_team = projectDoc.project_team.filter(
      (team) => team.toString() !== team_id
    );

    // Save the updated project document
    await projectDoc.save();
    await Team.deleteOne({ _id: team_id });

    return res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT TEAM
const editTeam = async (req, res) => {
  try {
    const {
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    } = req.body;
    const { team_id } = req.params;
    const teamDoc = await Team.findOne({ _id: team_id });

    if (!teamDoc) {
      return res.status(409).json({ message: "Team does not exist" });
    }

    await teamDoc.set({
      phaseNumber,
      numberOfResources,
      role,
      availabilityPercentage,
      duration,
    });

    await teamDoc.save();
    return res.status(200).json({ message: "Team edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createTeam, editTeam, deleteTeam };
