const User = require("../models/userModel");

//CREATE ADMIN
const createAdmin = async (req, res, next) => {
  try {
    const adminDoc = await User.create({
      name: "Admin",
      role: "Admin",
      email: process.env.ADMIN_EMAIL,
    });

    return res.status(200).json({ message: "Admin created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

//CREATE ADMIN
const createAuditor = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const adminDoc = await User.create({
      name,
      role: "Auditor",
      email,
    });

    return res.status(200).json({ message: "Auditor created" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

//CHECK USER AND SEND USER
const checkUser = async (req, res, next) => {
  const { user } = req.body;
  try {
    const userDoc = await User.findOne({
      email: user?.email,
    });
    if (userDoc) {
      console.log(userDoc);
      return res.status(200).json(userDoc);
    }
    if (!userDoc) {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = { createAdmin, checkUser, createAuditor };
