const Course = require("../model/course");
const { uploadToCloudinary } = require("../Helpers/cloudinary-helpers");

const handleUploadCourseImage = async (req, res) => {
  try {
    const files = req.files;
    const results = await Promise.all(
      files.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const url = `data:${file.mimetype};base64,${b64}`;
        return await uploadToCloudinary(url);
      })
    );
    res.json({ success: true, results });
  } catch (error) {
    res.json({ success: false, message: "Error occured" });
  }
};

const handleUploadCourseThumbnail = async (req, res) => {
  try {
    const file = req.file;
    const b64 = Buffer.from(file?.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await uploadToCloudinary(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      courseDescription,
      courseMaterials,
      tutorId,
      courseThumbnail,
    } = req.body;

    if (
      !courseTitle ||
      !courseDescription ||
      !courseMaterials ||
      !tutorId ||
      !courseThumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newCourse = await Course.create({
      courseTitle,
      courseDescription,
      courseMaterials,
      tutorId,
      courseThumbnail,
    });

    if (!newCourse) {
      res.status(400).json({
        success: false,
        message: "Failed to create a course",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("Error occured while creating course");
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      res.status(400).json({
        success: false,
        message: "Could not find course",
      });
    }
    res.status(200).json({
      success: true,
      message: "course deleted successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occured while deleting course");
  }
};
const fetchCourseForTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const course = await Course.find({ tutorId }).populate("tutorId");

    if (!course) {
      res.status(400).json({
        success: false,
        message: "Failed to find tutor course",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor courses fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occured while deleting course");
  }
};
const fetchAllCourse = async (req, res) => {
  try {
    const course = await Course.find().populate("tutorId");

    if (!course) {
      res.status(400).json({
        success: false,
        message: "Failed to find tutor course",
      });
    }

    res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log("Error occured while deleting course");
  }
};
const courseDetails=async (req,res)=>{
  try {

    const {id}=req.params

    const course=await Course.findById(id).populate("tutorId")
    if(!course){
      return res.status(404).json({
        success:false,
        message:"Failed to fetch course details"
      })
    }
    res.json({
      success:true,
      message:"Course details fetched",
      data:course
    })
    
  } catch (error) {
    console.log("error occured whiles fetching course details" ,error.message);
    
  }
}

module.exports = {
  fetchCourseForTutor,
  deleteCourse,
  createCourse,
  handleUploadCourseImage,
  fetchAllCourse,
  handleUploadCourseThumbnail,
  courseDetails
};
