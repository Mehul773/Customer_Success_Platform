const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createClientFeedback,
  deleteClientFeedback,
  editClientFeedback,
} = require("../controllers/clientFeedbackController");

/* APIs */
//CREATE CLIENT FEEDBACK
router.post("/:project_id", createClientFeedback);

//DELETE CLIENT FEEDBACK
router.delete("/:project_id/:clientFeedback_id", deleteClientFeedback);

//EDIT CLIENT FEEDBACK
router.put("/:clientFeedback_id", editClientFeedback);

module.exports = router;
