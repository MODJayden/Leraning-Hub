import React, { useEffect, useState } from "react";
import bg from "./bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourse } from "@/store/course";
import CourseBag from "@/components/CourseBag";
import { Link } from "react-router-dom";


const Home = () => {
  const { allCourses } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const slicedCourse=allCourses?.slice(0,4)
  const slicedBack=allCourses?.slice(-4)

  const filteredProperty = slicedCourse?.filter(
    (pro) =>
      pro.courseTitle.toLocaleLowerCase().includes(searchTerm) ||
      pro.tutorId.firstName.toLocaleLowerCase().includes(searchTerm) ||
      pro.tutorId.lastName.toLocaleLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    dispatch(fetchAllCourse());
  }, [dispatch]);

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "James Obeng",
      comment: "This platform changed my life! The courses are top-notch.",
    },
    {
      id: 2,
      name: "Anna Koomson",
      comment: "I learned so much in such a short time. Highly recommended!",
    },
    {
      id: 3,
      name: "Bright Omari",
      comment:
        "The instructors are amazing. I can't believe how much I've grown.",
    },
  
  ];
  const testimonialsRight = [
    {
    id: 1,
    name: "Kingsley Newman",
    comment: "I was able to switch careers and land my dream job!",
    },
    {
    id: 2,
    name: "Innocent Coofie",
    comment: "The skills I learned here have been invaluable in my professional journey.",
    },
    {
    id: 3,
    name: "Kuboore M.",
    comment: "I was blown away by the quality of the courses and instructors.",
    },
    ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div>
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="relative text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl font-bold mb-6 md:text-5xl">
              Learn the skills you need to succeed
            </h1>
            <p className="text-xl mb-8">
              Join millions of learners worldwide and explore thousands of
              courses in programming, business, design, and more.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/courses">
              <button className="bg-[#a435f0] text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Start Learning
              </button>
              </Link>
             
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-12 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from industry experts with real-world experience.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">Lifetime Access</h3>
                <p className="text-gray-600">
                  Get lifetime access to courses and updates.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">Flexible Learning</h3>
                <p className="text-gray-600">
                  Learn at your own pace, anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#f7f9fa] py-8">
        <div className="container mx-auto text-center">
          <form className="flex justify-center">
            <input
              type="text"
              placeholder="Search by courses-title,tutor-name"
              className="w-1/2 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Course List */}
      <main className="container mx-auto p-8 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-[#1c1d1f]">
          Popular Courses
        </h2>
        <CourseBag allCourses={filteredProperty} />
      </main>
      {/* Latest List */}
      <main className="container mx-auto p-8 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-[#1c1d1f]">
          Latest Courses
        </h2>
        <CourseBag allCourses={slicedBack} />
      </main>

      {/* Testimonials Section */}
      <div className="lg:block  movingContainer">
        <div className=" bg-[#f7f9fa] py-12 overflow-hidden">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Students Say
          </h2>
          {/* Left-to-Right Scroll */}
          <div className="whitespace-wrap overflow-hidden">
            <div className="inline-block scroll-left ">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="inline-block bg-white p-6 rounded-lg shadow-lg mx-4 w-64"
                >
                  <p className="text-gray-600 italic ">
                    "{testimonial.comment}"
                  </p>
                  <p className="mt-4 font-semibold text-gray-800">
                    {" "}
                    - {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Right-to-Left Scroll */}
          <div className="whitespace-wrap overflow-hidden mt-8">
            <div className="inline-block scroll-right">
              {testimonialsRight.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="inline-block bg-white p-6 rounded-lg shadow-lg mx-4 w-64"
                >
                  <p className="text-gray-600 italic">
                    "{testimonial.comment}"
                  </p>
                  <p className="mt-4 font-semibold text-gray-800">
                    - {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
   
    </div>
  );
};

export default Home;
