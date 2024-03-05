const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createStackholder,
  deleteStackholder,
  editStackholder,
} = require("../controllers/stackholderController");

/* APIs */
router.post("/create-stackholder/:project_id", createStackholder);

router.delete(
  "/delete-stackholder/:project_id/:stackholder_id",
  deleteStackholder
);

router.put("/edit-stackholder/:stackholder_id", editStackholder);

module.exports = router;
