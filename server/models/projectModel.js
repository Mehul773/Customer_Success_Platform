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
    },
    project_budget: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
      },
    ],
    project_risks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Risk",
      },
    ],
    project_phases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phase",
      },
    ],
    project_sprints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprint",
      },
    ],
    project_stackholder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StackHolder",
      },
    ],
    project_audit_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuditHistory",
      },
    ],
    project_operational_matrix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OperationalMatrix",
      },
    ],
    project_financial_matrix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FinancialMatrix",
      },
    ],
    project_technical_matrix: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TechnicalMatrix",
      },
    ],
    project_version_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VersionHistory",
      },
    ],
    project_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    project_resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
    project_clientFeedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientFeedback",
      },
    ],
    project_projectUpdates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectUpdate",
      },
    ],
    project_mom: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mom",
      },
    ],
    project_team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;
