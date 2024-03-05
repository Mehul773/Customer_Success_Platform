const express = require("express");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
  fetchOneProject,
} = require("../controllers/projectController");

/* APIs */
router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);

router.post("/create-project", createProject);

router.delete("/delete-project/:id", deleteProject);

router.put("/edit-project", editProject);

module.exports = router;
