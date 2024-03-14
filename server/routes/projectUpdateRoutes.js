const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createProjectUpdate,
  deleteProjectUpdate,
  editProjectUpdate,
} = require("../controllers/projectUpdateController");

/* APIs */
//CREATE RESOURCE
router.post("/:project_id", createProjectUpdate);

//DELETE RESOURCE
router.delete("/:project_id/:projectUpdate_id", deleteProjectUpdate);

//EDIT RESOURCE
router.put("/:projectUpdate_id", editProjectUpdate);

module.exports = router;
