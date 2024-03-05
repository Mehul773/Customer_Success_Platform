const mongoose = require("mongoose");

const SprintSchema = new mongoose.Schema(
  {
    sprint: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const SprintModel = mongoose.model("Sprint", SprintSchema);
module.exports = SprintModel;
