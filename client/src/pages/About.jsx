import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaAward } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We are dedicated to providing high-quality education to learners
            worldwide.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <FaUserGraduate className="text-5xl text-[#a435f0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Expert Instructors
            </h3>
            <p className="text-gray-600">
              Learn from industry experts with real-world experience.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <FaChalkboardTeacher className="text-5xl text-[#a435f0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Interactive Learning
            </h3>
            <p className="text-gray-600">
              Engage in hands-on projects and interactive lessons.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <FaAward className="text-5xl text-[#a435f0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Certified Courses
            </h3>
            <p className="text-gray-600">
              Earn certificates recognized by top companies.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-12 bg-[#a435f0] p-8 rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            Our mission is to make education accessible and affordable for
            everyone, everywhere. We believe in empowering individuals to achieve
            their goals through high-quality online learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;