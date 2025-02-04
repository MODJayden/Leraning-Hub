const express = require("express");
const router = express.Router();

const {
  fetchAllEnrolledCourse,
  deleteEnrolledCourse,
  EnrollCourse,
  getCurrentEnrolledCourse,
} = require("../controllers/enroll-student");

router.post("/enroll-course", EnrollCourse);
router.get(`/get/enrolled-course/:studentId`, fetchAllEnrolledCourse);
router.get(`/getCurrent/enrolled-course/:id`, getCurrentEnrolledCourse);
router.delete(`/delete/enrolled-course/:id`, deleteEnrolledCourse);

module.exports = router;
