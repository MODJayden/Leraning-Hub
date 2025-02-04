
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCourseDetails } from "@/store/course";
import { User, BookOpen, ArrowRight, FileText, Mail } from "lucide-react";
const CourseMaterials = () => {
  const { courseDetail } = useSelector((store) => store.course);
  const { user,isAuth } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCourseDetails({ id: id }));
  }, [id]);

  return (
    <div className="flex flex-wrap justify-center m-4 bg-gray-50 py-8 rounded-lg shadow-sm">
      {/* Course Thumbnail Section */}
      <div className="w-full md:w-1/2 p-6">
        <div className="property-detail-image mt-4">
          <img
            src={courseDetail?.courseThumbnail}
            alt={courseDetail?.courseTitle}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>

      {/* Course Details Section */}
      <div className="w-full flex flex-col justify-center md:w-1/2 p-6">
        {/* Course Title */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Course Title</p>
              <h2 className="text-2xl font-bold">
                {courseDetail?.courseTitle}
              </h2>
            </div>
          </div>
        </div>

        {/* Tutor Details */}
        <div className="property-meta flex items-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tutor</p>
            <h2 className="text-xl font-semibold">
              {courseDetail?.tutorId.firstName} {courseDetail?.tutorId.lastName}
            </h2>
            <div className="flex items-center mt-1">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-sm text-gray-600">
                {courseDetail?.tutorId.email}
              </p>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="property-description mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold">Description</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {courseDetail?.courseDescription}
          </p>
        </div>

        {/* Course Materials */}
        <div className="property-materials mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Course Materials</h2>
          </div>
          <p className="text-lg text-gray-600">
            {courseDetail?.courseMaterials?.length} materials available
          </p>
        </div>

        {/* Enroll Button */}
        {user?.role === "tutor" ? (
          <button className="flex items-center justify-center bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300 cursor-not-allowed" disabled>
            Tutor can't enroll a Course
          </button>
        ) : (  isAuth?
          <Link to={`/enroll/${courseDetail?._id}`}>
            <button className="flex items-center justify-center bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300 ">
              Enroll Course
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link> : <Link to={`/auth/login`}>
            <button className="flex items-center justify-center bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300 ">
              Enroll Course
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseMaterials;
