const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["pending", "submitted", "graded"],
      default: "pending",
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
    submission: String,
    grade:{
    type:Number,
    default:0
  },
  },
  { timestamps: true }
);

const submission = mongoose.model("submitted-assignment", submissionSchema);

module.exports = submission;
