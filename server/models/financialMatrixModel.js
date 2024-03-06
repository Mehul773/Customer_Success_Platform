const mongoose = require("mongoose");

const FinancialMatrixSchema = new mongoose.Schema(
  {
    level: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const FinancialMatrixModel = mongoose.model(
  "FinancialMatrix",
  FinancialMatrixSchema
);
module.exports = FinancialMatrixModel;
