const express = require("express");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
} = require("../controllers/projectController");

/* APIs */
router.post("/create-project", createProject);
router.get("/display-projects", displayProjects);
router.delete("/delete-project/:id", deleteProject);
router.put("/edit-project", editProject);

module.exports = router;
