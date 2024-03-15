const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  editMom,
  deleteMom,
  createMom,
} = require("../controllers/momController");

/* APIs */
//CREATE MOM
router.post("/:project_id", createMom);

//DELETE MOM
router.delete("/:project_id/:mom_id", deleteMom);

//EDIT MOM
router.put("/:mom_id", editMom);

module.exports = router;
