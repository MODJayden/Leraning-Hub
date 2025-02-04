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

// Connect to your database
connectDB();

// Setup CORS and cookie parsers
const allowedOrigins = [
  "https://leraning-hubb.onrender.com",
  "https://leraning-hub-lvch.onrender.com",
  "http://localhost:5173", // For local development
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["PUT", "DELETE", "GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires"],
    credentials: true,
  })
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