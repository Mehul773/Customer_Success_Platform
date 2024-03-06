const mongoose = require("mongoose");

const OperationalMatrixSchema = new mongoose.Schema(
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
const OperationalMatrixModel = mongoose.model(
  "OperationalMatrix",
  OperationalMatrixSchema
);
module.exports = OperationalMatrixModel;
