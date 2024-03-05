const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createSprint,
  deleteSprint,
  editSprint,
} = require("../controllers/sprintController");

/* APIs */
router.post("/create-sprint/:project_id", createSprint);

router.delete("/delete-sprint/:project_id/:sprint_id", deleteSprint);

router.put("/edit-sprint/:sprint_id", editSprint);

module.exports = router;
