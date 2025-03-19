const mongoose = require("mongoose");

const { Schema } = mongoose;

const enrollCourseSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    studentId: String,
    studentName: String,
    courseProgress: {
      type: Number,
      default: 0,
    },
    payment:{
      type:String,
      enum:["paid","unpaid"],
      default:"unpaid"
    }
  },
  { timestamps: true }
);

const Enrolled = mongoose.model("enroll-course", enrollCourseSchema);

module.exports = Enrolled;
