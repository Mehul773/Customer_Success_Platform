const mongoose = require("mongoose");

const StackHolderSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const StackHolderModel = mongoose.model("StackHolder", StackHolderSchema);
module.exports = StackHolderModel;
