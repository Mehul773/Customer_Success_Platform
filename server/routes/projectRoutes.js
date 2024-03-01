const express = require("express");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  createProject,
  displayProjects,
} = require("../controllers/projectController");

/* APIs */
router.post("/create-project", createProject);
router.get("/display-projects", displayProjects);

module.exports = router;
