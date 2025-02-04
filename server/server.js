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

//connect to your database
connectDB();

//setup cors and cookie parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["PUT", "DELETE", "GET", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
    ],
    credentials: true,
  })
);

//handle options requests
app.options('*', cors());


//routes
app.use("/api/data", userRouter);
app.use("/api/enrollment", enrollRouter);
app.use("/api/course", courseRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/submission", submissionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
