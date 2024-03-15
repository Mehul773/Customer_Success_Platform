const User = require("../models/userModel");
const Project = require("../models/projectModel");
const { emailCreateUser } = require("./emailController");

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

//GET USER BY ROLE
const getUserByrole = async (req, res) => {
  const { role } = req.body;
  try {
    const users = await User.find({ role: role });
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
    await userDoc.save();
    return res.status(200).json({ message: "user edited successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// ASSIGN PROJECT TO USER
const assignProject = async (req, res, next) => {
  try {
    const { user_id, project_id } = req.params;

    const userDoc = await User.findOne({ _id: user_id });
    const projectDoc = await Project.findOne({ _id: project_id });

    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }
    if (!userDoc) {
      return res.status(409).json({ message: "user does not exist" });
    }

    userDoc?.projects?.push(project_id);
    projectDoc?.project_users?.push(userDoc._id);
    await userDoc.save();
    await projectDoc.save();
    emailCreateUser(project_id);
    return res
      .status(200)
      .json({ message: "assign project to user successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occurred ${error}` });
  }
};

// UNASSIGN PROJECT TO USER
const unassignProject = async (req, res, next) => {
  try {
    const { user_id, project_id } = req.params;

    const userDoc = await User.findOne({ _id: user_id });
    const projectDoc = await Project.findOne({ _id: project_id });

    if (!projectDoc) {
      return res
        .status(404)
        .json({ message: "Project not found for this phase" });
    }
    if (!userDoc) {
      return res.status(409).json({ message: "user does not exist" });
    }

    //REMOVE USER FROM PROJECT TABLE
    projectDoc.project_users = projectDoc.project_users.filter(
      (user) => user.toString() !== user_id
    );

    //REMOVE PROJECT FROM USER TABLE
    userDoc.projects = userDoc.projects.filter(
      (project) => project.toString() !== project_id
    );

    await userDoc.save();
    await projectDoc.save();
    return res.status(200).json({ message: "unassign project successfully" });
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
  getUserByrole,
  assignProject,
  unassignProject,
};
