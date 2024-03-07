const mongoose = require("mongoose");

const VersionHistorySchema = new mongoose.Schema(
  {
    no: {
      type: Number,
    },
    type: {
      type: String,
    },
    change: {
      type: String,
    },
    changeReason: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    revisionDate: {
      type: Date,
    },
    approvalDate: {
      type: Date,
    },
    approvedBy: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const VersionHistoryModel = mongoose.model(
  "VersionHistory",
  VersionHistorySchema
);
module.exports = VersionHistoryModel;
