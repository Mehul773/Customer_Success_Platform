const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createTeam,
  deleteTeam,
  editTeam,
} = require("../controllers/teamController");

/* APIs */
//CREATE RESOURCE
router.post("/:project_id", createTeam);

//DELETE RESOURCE
router.delete("/:project_id/:team_id", deleteTeam);

//EDIT RESOURCE
router.put("/:team_id", editTeam);

module.exports = router;
