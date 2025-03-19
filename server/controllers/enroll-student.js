const Enrolled = require("../model/enroll-student");

const EnrollCourse = async (req, res) => {
  try {
    const { courseId, studentId, studentName, courseProgress,payment } = req.body;
    console.log(courseId);

    if (!courseId || !studentId || !studentName) {
      return res.status(402).json({
        success: false,
        message: "All fields are required",
      });
    }
    const studentEnrollment = await Enrolled.find({ studentId });

    const checkSameCourse = studentEnrollment.some(
      (course) => course.courseId.toString() === courseId
    );

    if (checkSameCourse) {
      return res.status(500).json({
        success: false,
        message: "Course has already been enrolled",
      });
    }

    const newEnrolledCourse = await Enrolled.create({
      courseId,
      studentId,
      studentName,
      courseProgress,
      payment
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

const deleteEnrolledCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const enrolledCourse = await Enrolled.findByIdAndDelete(id);
    if (!enrolledCourse) {
      res.status(400).json({
        success: false,
        message: "Failed to delete enrolled course",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course dropped successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchEnrolledStudent = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const enrolledStudents = await Enrolled.find().populate("courseId");
    

    const filteredStudents = enrolledStudents.filter((student) => {
      return student.courseId && student.courseId.tutorId.toString() === tutorId;
    });
    


    if (!filteredStudents || filteredStudents.length === 0) {
      console.log("No enrolled students found for this tutor");
      res.status(404).json({
        success: false,
        message: "No enrolled students found for this tutor",
      });
    } else {
      console.log("Enrolled students fetched successfully");
      res.status(200).json({
        success: true,
        message: "Enrolled students fetched successfully",
        data: filteredStudents,
      });
    }
  } catch (error) {
    console.log("Error fetching enrolled students:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment } = req.body;
    

    const updatedEnrollment = await Enrolled.findByIdAndUpdate(
      id,
      { payment },
      { new: true }
    );

    if (!updatedEnrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
        
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: updatedEnrollment,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  fetchAllEnrolledCourse,
  EnrollCourse,
  getCurrentEnrolledCourse,
  deleteEnrolledCourse,
  fetchEnrolledStudent,
  updatePaymentStatus
};
