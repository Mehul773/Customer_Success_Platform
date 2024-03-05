const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: null,
    },
    duration: {
      type: Number,
      required: true,
      default: null,
    },
    budgetedHours: {
      type: Number,
      required: true,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);
const BudgetModel = mongoose.model("Budget", BudgetSchema);
module.exports = BudgetModel;
