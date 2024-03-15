const mongoose = require("mongoose");

const MomSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    duration: {
      type: String,
    },
    link: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const MomModel = mongoose.model("Mom", MomSchema);
module.exports = MomModel;
