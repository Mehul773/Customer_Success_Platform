const mongoose = require("mongoose");

const TechnicalMatrixSchema = new mongoose.Schema(
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
const TechnicalMatrixModel = mongoose.model(
  "TechnicalMatrix",
  TechnicalMatrixSchema
);
module.exports = TechnicalMatrixModel;
