const express = require("express");
const {
  submitAssignment,
  fetchSubmissionForStudent,
  fetchSubmissionForTutor,
  gradeAssignment,
} = require("../controllers/submission");

const router = express.Router();

router.post(`/submit-assignment`, submitAssignment);
router.post(`/update/grade-assignment/:submissionId`, gradeAssignment);
router.get(
  `/get/submitted-assignment/:assignmentId/:studentId`,
  fetchSubmissionForStudent
);
router.get(`/get/tutor/:tutorId`, fetchSubmissionForTutor);

module.exports = router;
