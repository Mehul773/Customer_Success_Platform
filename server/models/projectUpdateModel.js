const mongoose = require("mongoose");

const ProjectUpdateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    updates: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const ProjectUpdateModel = mongoose.model("ProjectUpdate", ProjectUpdateSchema);
module.exports = ProjectUpdateModel;
