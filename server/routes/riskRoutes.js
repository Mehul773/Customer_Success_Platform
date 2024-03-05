const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createRisk,
  deleteRisk,
  editRisk,
} = require("../controllers/riskController");

/* APIs */
router.post("/create-risk/:project_id", createRisk);

router.delete("/delete-risk/:project_id/:risk_id", deleteRisk);

router.put("/edit-risk/:risk_id", editRisk);

module.exports = router;
