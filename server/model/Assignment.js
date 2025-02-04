const mongoose = require("mongoose");
const { Schema } = mongoose;


const assignmentSchema = new Schema({
  title: String,
  submissionRequirements: String,
  questions:String,
  deadline: Date,
  
 
  enrolledId: [{ type: mongoose.Schema.Types.ObjectId, ref: "enroll-course" }],
  tutorId:String
  ,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
