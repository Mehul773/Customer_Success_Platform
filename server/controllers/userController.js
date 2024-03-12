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

//CREATE AUDITOR
const createUser = async (req, res, next) => {
  const { name, email, role } = req.body;
  try {
    const userDoc = await User.create({
      name,
      role,
      email,
    });

    return res.status(200).json({ message: "User created " });
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

//DISPLAY ALL USERS
const displayUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "Admin" } });
    if (users) {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

//DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    await User.deleteOne({ _id: user_id });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// EDIT USER
const editUser = async (req, res, next) => {
  try {
    const { role, name, email } = req.body;
    const { user_id } = req.params;
    const userDoc = await User.findOne({ _id: user_id });

    if (!userDoc) {
      return res.status(409).json({ message: "user does not exist" });
    }

    await userDoc.set({
      name,
      role,
      email,
    });
    console.log(userDoc);
    await userDoc.save();
    return res.status(200).json({ message: "user edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

module.exports = {
  createAdmin,
  checkUser,
  createUser,
  displayUsers,
  deleteUser,
  editUser,
};
