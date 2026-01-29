const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/DB");
const app = express();
const PORT = process.env.PORT || 9090;
const userRouter = require("./Routes/user");
const enrollRouter = require("./Routes/enroll");
const courseRouter = require("./Routes/course");
const assignmentRouter = require("./Routes/assignment");
const submissionRouter = require("./Routes/submission");
const path = require("path");

const CronJob = require("./cron/cron");

// Connect to your database
connectDB();

// Setup CORS and cookie parsers
const allowedOrigins = [
  "https://leraning-hubb.onrender.com",
  "http://localhost:5173", // For local development
];

app.use(express.static(path.join(__dirname, "../client")));

// Serve robots.txt and sitemap.xml from the root
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/sitemap.xml"));
});
CronJob.start();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "cache-control"],
    credentials: true,
  }),
);

// Handle OPTIONS requests
app.options("*", cors());

// Routes
app.use("/api/data", userRouter);
app.use("/api/enrollment", enrollRouter);
app.use("/api/course", courseRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/submission", submissionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
