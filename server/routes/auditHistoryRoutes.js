const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createAuditHistory,
  deleteAuditHistory,
  editAuditHistory,
} = require("../controllers/auditHistoryController");

/* APIs */
router.post("/create-auditHistory/:project_id", createAuditHistory);

router.delete(
  "/delete-auditHistory/:project_id/:auditHistory_id",
  deleteAuditHistory
);

router.put("/edit-auditHistory/:project_id/:auditHistory_id", editAuditHistory);

module.exports = router;
