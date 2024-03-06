const mongoose = require("mongoose");

const AuditHistorySchema = new mongoose.Schema(
  {
    dateOfAudit: {
      type: Date,
    },
    reviewedBy: {
      type: String,
    },
    status: {
      type: String,
    },
    comment: {
      type: String,
    },
    actionItem: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const AuditHistoryModel = mongoose.model("AuditHistory", AuditHistorySchema);
module.exports = AuditHistoryModel;
