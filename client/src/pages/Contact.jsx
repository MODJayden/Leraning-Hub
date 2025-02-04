import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Reach out to us for any questions or
            feedback.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Address */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt className="text-5xl text-[#a435f0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Address</h3>
            <p className="text-gray-600">
             Tudu Street, ATU Campus, Accra
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <FaPhone className="text-5xl text-[#a435f0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Phone</h3>
            <p className="text-gray-600">+233 257479336 </p>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-5xl text-[#a435f0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Email</h3>
            <p className="text-gray-600">Apex@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#a435f0] text-white px-6 py-2 rounded-lg hover:bg-[#4a1fb8] focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;