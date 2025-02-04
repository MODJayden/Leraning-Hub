const express = require("express");
const router = express.Router();

const {
  getEnrolledCourseAssignments,
  createAssignment,
  getSubmittedAssignments,
} = require("../controllers/Assignment");

router.post("/create-assignment", createAssignment);
router.get(
  `/get/enrolled-assignment/:enrolledId`,
  getEnrolledCourseAssignments
);
router.get(`/get/tutor-assignment/:tutorId`, getSubmittedAssignments);

module.exports = router;
