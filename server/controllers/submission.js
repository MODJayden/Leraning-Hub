const Assignment = require("../model/Assignment");
const Submission = require("../model/assignment-submission");
const Enrolled = require("../model/enroll-student");

const submitAssignment = async (req, res) => {
  try {
    const { submission, status, studentId, assignmentId } = req.body;

    if (!studentId || !submission || !assignmentId) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const submit = await Submission.create({
      submission,
      status: "submitted",
      studentId,
      assignmentId,
    });

    if (!submit) {
      res.status(400).json({
        success: false,
        message: "Failed to submit assignment",
      });
    }
    res.json({
      success: true,
      message: "Assignment submitted successfully",
      data: submit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting assignment" });
  }
};
const fetchSubmissionForStudent = async (req, res) => {
  try {
    const { studentId, assignmentId } = req.params;

    const submit = await Submission.find({
      $and: [{ assignmentId }, { studentId }],
    }).populate("assignmentId");

    if (!submit) {
      res.status(400).json({
        success: false,
        message: "Failed to fetch submission",
      });
    }
    res.json({
      success: true,
      message: " submitted assignment fetched successfully",
      data: submit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching submmitted assignment" });
  }
};
const fetchSubmissionForTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    console.log(tutorId);

    const submissions = await Submission.find().populate("assignmentId");

    const submission = submissions.filter((ass) => ass.assignmentId.tutorId === tutorId);
    console.log(submission);

    /*   .populate({
        path: "assignmentId",
        populate: {
          path: "enrolledId",
          model: "enroll-course",
          match: { tutorId: tutorId },
        },
      })
      .populate({
        path: "assignmentId.enrolledId",
        model: "enroll-course",
      })
      .populate("studentId"); */

    if (!submission) {
      res.status(400).json({
        success: false,
        message: "Failed to fetch submission",
      });
    }
    res.json({
      success: true,
      message: " all submitted assignment fetched successfully",
      data: submission,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching all submmitted assignment" });
  }
};
const gradeAssignment = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, studentId } = req.body;

    // Find the assignment and enrolled course
    const submission = await Submission.findById(submissionId);
    const enrolled = await Enrolled.find({ studentId });
    const SpecAssignment = await Assignment.findById(submission.assignmentId);

    submission.grade = grade;
    submission.status = "graded";
    await submission.save();

    // Find the enrolled course that matches the course ID of the assignment
    const enrolledCourse = enrolled.find((enroll) =>
      SpecAssignment.enrolledId.some((id) => id.equals(enroll._id))
    );

    if (enrolledCourse) {
      // Update the course progress for the enrolled course
      enrolledCourse.courseProgress =
        Number(enrolledCourse.courseProgress) + Number(grade);
      await enrolledCourse.save();
    }

    res.json({
      success: true,
      data: submission,
      message: "Assignment graded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error grading assignment" });
  }
};

module.exports = {
  submitAssignment,
  fetchSubmissionForStudent,
  fetchSubmissionForTutor,
  gradeAssignment,
};

/* const updates = matchedEnrolled.map((enrolled) => {
      return {
        updateOne: {
          filter: { _id: enrolled._id },
          update: { $inc: { courseProgress: grade } },
        },
      };
    });

    await Enrolled.bulkWrite(updates); */
