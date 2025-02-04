import CourseBag from "@/components/CourseBag";
import { fetchAllCourse } from "@/store/course";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


// src/pages/CourseDetails.jsx

const CourseDetails = () => {
  const { allCourses } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
    
  
    const filteredCourses = allCourses?.filter(
      (pro) =>
        pro.courseTitle.toLocaleLowerCase().includes(searchTerm) ||
        pro.tutorId.firstName.toLocaleLowerCase().includes(searchTerm) ||
        pro.tutorId.lastName.toLocaleLowerCase().includes(searchTerm)
    ); 
  

  useEffect(() => {
    dispatch(fetchAllCourse());
  }, [dispatch]);
  return (
    <>
      <div className="bg-[#f7f9fa] py-8">
        <div className="container mx-auto text-center">
          <form className="flex justify-center">
            <input
              type="text"
              placeholder="Search by courses title, tutor name"
              className="w-1/2 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#a435f0] text-white px-6 py-2 rounded-r-lg hover:bg-[#4a1fb8] focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <main className="container mx-auto p-8 flex-grow">
        <CourseBag allCourses={filteredCourses} />
      </main>
    </>
  );
};

export default CourseDetails;
