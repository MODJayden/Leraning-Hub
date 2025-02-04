const Assignment = require("../model/Assignment");
const Enrolled = require("../model/enroll-student");

const createAssignment = async (req, res) => {
  try {
    const {
      title,
      submissionRequirements,
      deadline,
      status,
      courseId,
      questions,
      submission,
      tutorId
    } = req.body;

    if (
      !title ||
      !submissionRequirements ||
      !deadline ||
      !courseId ||
      !questions||
      !tutorId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const enrolledCourse = await Enrolled.find({ courseId });

    const enrolledId = enrolledCourse.map((enroll) => enroll.id);

    const newAssignment = await Assignment.create({
      title,
      submissionRequirements,
      deadline,
     
      status,
      questions,
      submission,
      enrolledId,
      tutorId
    });

    if (!newAssignment) {
      return res.status(401).json({
        success: false,
        message: "something went wrong",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Assignment created successfully",
        data: newAssignment,
      });
    }
  } catch (error) {
    console.log("error occured while creating an assignment", error.message);
  }
};





const getEnrolledCourseAssignments = async (req, res) => {
  try {
    const { enrolledId } = req.params;

    const assignments = await Assignment.find({
      enrolledId: { $in: enrolledId },
    }).populate({ path: "enrolledId" });

    if (!assignments) {
      res.status(400).json({
        success: false,
        message: "No assignment available",
      });
    }

    res.json({
      success: true,
      message: "Assignment fetched fetched successfully",
      data: assignments,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching enrolled course assignments" });
  }
};

const getSubmittedAssignments = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const submittedAssignments = await Assignment.find({
      tutorId,
      status: "submitted",
    })
      .populate("enrolledId")
      .populate("studentId");

    res.json({
      success: true,
      data: submittedAssignments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching submitted assignments" });
  }
};

module.exports = {
  getEnrolledCourseAssignments,
  createAssignment,
  getSubmittedAssignments,
};
