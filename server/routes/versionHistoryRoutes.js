const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createVersionHistory,
  deleteVersionHistory,
  editVersionHistory,
} = require("../controllers/versionHistoryController");

/* APIs */
router.post("/create-versionHistory/:project_id", createVersionHistory);

router.delete(
  "/delete-versionHistory/:project_id/:versionHistory_id",
  deleteVersionHistory
);

router.put(
  "/edit-versionHistory/:project_id/:versionHistory_id",
  editVersionHistory
);

module.exports = router;
