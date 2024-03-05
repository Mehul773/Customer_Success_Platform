const mongoose = require("mongoose");

const PhaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    approvalDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    revisedCompletionDate: {
      type: Date,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const PhaseModel = mongoose.model("Phase", PhaseSchema);
module.exports = PhaseModel;
