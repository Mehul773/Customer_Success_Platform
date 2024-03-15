const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    phaseNumber: {
      type: Number,
      required: true,
    },
    numberOfResources: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    availabilityPercentage: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
