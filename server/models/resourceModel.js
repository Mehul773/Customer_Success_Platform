const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    resourceName: {
      type: String,
    },
    role: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const ResourceModel = mongoose.model("Resource", ResourceSchema);
module.exports = ResourceModel;
