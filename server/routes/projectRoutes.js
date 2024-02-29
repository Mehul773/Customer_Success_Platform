const express = require("express");

/* ROUTER */
const router = express.Router();

/* ALL FUNCTIONS */
const { createProject } = require("../controllers/projectController");

/* APIs */
router.post("/create-project", createProject);

module.exports = router;
