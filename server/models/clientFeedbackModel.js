const mongoose = require("mongoose");

const ClientFeedbackSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    dateReceived: {
      type: Date,
    },
    feedback: {
      type: String,
    },
    actionTaken: {
      type: String,
    },
    closureDate: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);
const ClientFeedbackModel = mongoose.model(
  "ClientFeedback",
  ClientFeedbackSchema
);
module.exports = ClientFeedbackModel;
