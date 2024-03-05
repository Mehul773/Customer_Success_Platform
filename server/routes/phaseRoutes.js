const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createPhase,
  deletePhase,
  editPhase,
} = require("../controllers/phaseController");

/* APIs */
router.post("/create-phase/:project_id", createPhase);

router.delete("/delete-phase/:project_id/:phase_id", deletePhase);

router.put("/edit-phase/:phase_id", editPhase);

module.exports = router;
