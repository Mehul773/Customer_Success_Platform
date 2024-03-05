const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    project_desc: {
      type: String,
      required: true,
    },
    project_scope: {
      type: String,
      required: true,
    },
    project_stack: {
      type: String,
      required: true,
    },
    project_status: {
      type: String,
      default: "In progress",
    },
    project_manager: {
      type: String,
      default: "Dipa majumdar",
    },
    project_budget: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
