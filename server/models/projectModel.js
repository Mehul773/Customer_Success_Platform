const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      require: true,
    },
    project_desc: {
      type: String,
      require: true,
    },
    project_scope: {
      type: String,
      require: true,
    },
    project_stack: {
      type: String,
      require: true,
    },
    project_status: {
      type: String,
      default: "In progress",
    },
    project_manager: {
      type: String,
      default: "Dipa majumdar",
    },
  },
  { timestamps: true, versionKey: false }
);
const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
