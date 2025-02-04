const express = require("express");
const {
  fetchCourseForTutor,
  deleteCourse,
  createCourse,
  handleUploadCourseImage,
  fetchAllCourse,
  handleUploadCourseThumbnail,
  courseDetails,
} = require("../controllers/course");
const { upload } = require("../Helpers/cloudinary-helpers");
const router = express.Router();

router.post("/upload", upload.array("course", 5), handleUploadCourseImage);
router.post(
  "/upload-thumbnail",
  upload.single("thumbnail"),
  handleUploadCourseThumbnail
);

router.post("/create-course", createCourse);
router.delete(`/delete-course/:id`, deleteCourse);
router.get(`/get-course/:tutorId`, fetchCourseForTutor);
router.get(`/getAll-course`, fetchAllCourse);
router.get(`/get/course-details/:id`, courseDetails);

module.exports = router;
