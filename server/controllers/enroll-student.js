const Enrolled = require("../model/enroll-student");


const EnrollCourse = async (req, res) => {
  try {
    const { courseId, studentId, studentName, courseProgress } = req.body;

    if (!courseId || !studentId || !studentName) {
      return res.status(402).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newEnrolledCourse = await Enrolled.create({
      courseId,
      studentId,
      studentName,
      courseProgress,
    });
    if (!newEnrolledCourse) {
      res.status(404).json({
        success: false,
        message: "something went wrong while during enrolling",
      });
    }
    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
      data: newEnrolledCourse,
    });
  } catch (error) {
    console.log("Error occurred while enrolling a course");
  }
};

const fetchAllEnrolledCourse = async (req, res) => {
  try {
    const { studentId } = req.params;

    const course = await Enrolled.find({ studentId }).populate("courseId");
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student courses fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occured while deleting course");
  }
};
const getCurrentEnrolledCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    

    const course = await Enrolled.findById(id).populate("courseId");
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student single course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occured while deleting course");
  }
};

const deleteEnrolledCourse=async(req,res)=>{
  try {
    const {id}=req.params

    const enrolledCourse=await Enrolled.findByIdAndDelete(id)
    if(!enrolledCourse){
      res.status(400).json({
        success:false,
        message:"Failed to delete enrolled course"
      })
    }
    res.status(200).json({
      success:true,
      message:"Course dropped successfully"
    })
    
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = {
  fetchAllEnrolledCourse,
  EnrollCourse,
  getCurrentEnrolledCourse,
  deleteEnrolledCourse
};
