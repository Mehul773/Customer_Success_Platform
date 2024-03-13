const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    email: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
