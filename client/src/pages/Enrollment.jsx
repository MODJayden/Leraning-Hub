import { useToast } from "@/assets/hooks/use-toast";
import { enrollCourse, getEnrolledCourse } from "@/store/enroll";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const Enrollment = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentName: user?.firstName.concat( user?.lastName)  ,
    courseId: id,
    studentId: user?.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(enrollCourse(formData)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getEnrolledCourse({studentId:user?.id}))
        navigate("/student/enrolled-courses")

        setFormData(formData)
        toast({
          title: "Success",
          description: res?.payload?.message
         
        });
      } else {
        toast({
          title: "Failed",
          description: res?.payload?.message,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Enrollment Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              FullName
            </label>
            <input
              type="studentName"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your fullname"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#a435f0] text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register course
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enrollment;
