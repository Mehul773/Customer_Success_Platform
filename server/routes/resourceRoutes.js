const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createResource,
  deleteResource,
  editResource,
} = require("../controllers/resourceController");

/* APIs */
//CREATE RESOURCE
router.post("/:project_id", createResource);

//DELETE RESOURCE
router.delete("/:project_id/:resource_id", deleteResource);

//EDIT RESOURCE
router.put("/:resource_id", editResource);

module.exports = router;
