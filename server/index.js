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

/* CONTROLLER */
const { sendMailToAll } = require("./controllers/emailController");
const { downloadAllContent } = require("./controllers/downloadAsPdf");

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

// SEND MAIL
app.get("/send-mail", sendMailToAll);
// DOWNLOAD ALL CONTENT
app.get("/download-pdf", downloadAllContent);
