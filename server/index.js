/* MODULES */
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

/* ROUTERS */
const projectRoutes = require("./routes/projectRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const riskRoutes = require("./routes/riskRoutes");
const phaseRoutes = require("./routes/phaseRoutes");
const sprintRoutes = require("./routes/sprintRoutes");
const stackholderRoutes = require("./routes/stackholderRoutes");
const auditHistoryRoutes = require("./routes/auditHistoryRoutes");
const versionHistoryRoutes = require("./routes/versionHistoryRoutes");
const matrixRoutes = require("./routes/matrixRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const clientFeedbackRoutes = require("./routes/clientFeedbackRoutes");
const projectUpdateRoutes = require("./routes/projectUpdateRoutes");
const momRoutes = require("./routes/momRoutes");
const teamRoutes = require("./routes/teamRoutes");

/* CONTROLLER */
const { sendMailToAll } = require("./controllers/emailController");
const { downloadAllContent } = require("./controllers/downloadAsPdf");
const {
  createAdmin,
  checkUser,
  displayUsers,
  createUser,
  deleteUser,
  editUser,
  getUserByrole,
  assignProject,
  unassignProject,
} = require("./controllers/userController");

/* CONFIGURATIONS */
dotenv.config();
const PORT = process.env.PORT || 4004;

/* EXPRESS CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

/* STARTUP */
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
connectDB();

/* APIs */
app.use("/project", projectRoutes);
app.use("/budget", budgetRoutes);
app.use("/risk", riskRoutes);
app.use("/phase", phaseRoutes);
app.use("/sprint", sprintRoutes);
app.use("/stackholder", stackholderRoutes);
app.use("/auditHistory", auditHistoryRoutes);
app.use("/versionHistory", versionHistoryRoutes);
app.use("/matrix", matrixRoutes);
app.use("/resource", resourceRoutes);
app.use("/clientFeedback", clientFeedbackRoutes);
app.use("/projectUpdate", projectUpdateRoutes);
app.use("/mom", momRoutes);
app.use("/team", teamRoutes);

// CREATE ADMIN
app.post("/admin", createAdmin);

// SEND MAIL
app.get("/send-mail/:project_id", sendMailToAll);

// DOWNLOAD ALL CONTENT
app.get("/download-pdf/:project_id", downloadAllContent);

//CHECK USER AND SEND USER INFO
app.post("/check-user", checkUser);

//==========================USER ROUTES===================================
//CREATE USER
app.post("/user", createUser);

//GET ALL USERS EXCEPT ADMIN
app.get("/users", displayUsers);

//DELETE ONE USER
app.delete("/user/:user_id", deleteUser);

//EDIT ONE USER
app.put("/user/:user_id", editUser);

//GET USER BY ROLE
app.post("/user-by-role", getUserByrole);

//ASSIGN PROJECT TO USER
app.put("/user/assign-project/:project_id/:user_id", assignProject);

//KICK OUT USER FROM PROJECT
app.delete("/user/:project_id/:user_id", unassignProject);
