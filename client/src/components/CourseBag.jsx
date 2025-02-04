import CourseMaterials from "@/pages/CourseMaterials";
import React from "react";
import { Link } from "react-router-dom";

const CourseBag = ({ allCourses }) => {
  return (
    <div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCourses?.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <img
              src={course?.courseThumbnail}
              alt={course?.courseTitle}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-[#1c1d1f]">
                {course.courseTitle}
              </h3>
              <p className="text-gray-600 mb-2">
                {course?.tutorId.firstName} {course?.tutorId.lastName}
              </p>
              <Link to={`/course/${course?._id}`}>
                <button className="mt-4 w-full bg-[#a435f0] text-white py-2 rounded-lg hover:bg-[#4a1fb8] focus:outline-none focus:ring-2 focus:ring-[#a435f0]">
                  View course Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBag;
