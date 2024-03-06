const express = require("express");

/* ROUTER */
const router = express.Router();

// ALL FUNCTIONS
const {
  createOperationalMatrix,
  deleteOperationalMatrix,
  editOperationalMatrix,
  createFinancialMatrix,
  deleteFinancialMatrix,
  editFinancialMatrix,
  createTechnicalMatrix,
  deleteTechnicalMatrix,
  editTechnicalMatrix,
} = require("../controllers/matrixController");

/* APIs */
router.post("/create-operationalMatrix/:project_id", createOperationalMatrix);
router.post("/create-financialMatrix/:project_id", createFinancialMatrix);
router.post("/create-technicalMatrix/:project_id", createTechnicalMatrix);

router.delete(
  "/delete-operationalMatrix/:project_id/:operationalMatrix_id",
  deleteOperationalMatrix
);
router.delete(
  "/delete-financialMatrix/:project_id/:financialMatrix_id",
  deleteFinancialMatrix
);
router.delete(
  "/delete-technicalMatrix/:project_id/:technicalMatrix_id",
  deleteTechnicalMatrix
);

router.put(
  "/edit-operationalMatrix/:operationalMatrix_id",
  editOperationalMatrix
);
router.put("/edit-financialMatrix/:financialMatrix_id", editFinancialMatrix);
router.put("/edit-technicalMatrix/:technicalMatrix_id", editTechnicalMatrix);

module.exports = router;
