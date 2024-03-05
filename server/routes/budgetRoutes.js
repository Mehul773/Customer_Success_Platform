const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createBudget,
  deleteBudget,
  editBudget,
} = require("../controllers/budgetController");

/* APIs */
router.post("/create-budget/:project_id", createBudget);

router.delete("/delete-budget/:project_id/:budget_id", deleteBudget);

router.put("/edit-budget/:budget_id", editBudget);

module.exports = router;
