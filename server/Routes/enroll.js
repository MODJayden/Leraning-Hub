const express = require("express");
const router = express.Router();

const {
  fetchAllEnrolledCourse,
  deleteEnrolledCourse,
  EnrollCourse,
  getCurrentEnrolledCourse,
  fetchEnrolledStudent,
  updatePaymentStatus
} = require("../controllers/enroll-student");

router.post("/enroll-course", EnrollCourse);
router.get(`/get/enrolled-course/:studentId`, fetchAllEnrolledCourse);
router.get(`/getCurrent/enrolled-course/:id`, getCurrentEnrolledCourse);
router.delete(`/delete/enrolled-course/:id`, deleteEnrolledCourse);
router.get(`/fetch/enrolled-student/:tutorId`, fetchEnrolledStudent);
router.put(`/update/payment-status/:id`, updatePaymentStatus);


module.exports = router;
