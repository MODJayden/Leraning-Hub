// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import CourseTracking from "./pages/student/Enrolled-courses";
import CourseUpload from "./pages/tutor/CourseUpload";
import CourseMaterials from "./pages/CourseMaterials";
import CreateAssessment from "./pages/tutor/Assignment";
import Performance from "./pages/student/Performance";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // New
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthLayout from "./pages/Layouts/AuthLayout";
import CheckAuth from "./Common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/user-slice";
import StudentLayout from "./pages/Layouts/StudentLayout";
import Enrolled from "./pages/student/Enrolled-courses";
import TutorLayout from "./pages/Layouts/TutorLayout";
import Enrollment from "./pages/Enrollment";
import Materials from "./pages/Materials";
import Assessment from "./pages/tutor/Assessment";
import SpecAssigment from "./pages/student/SpecAssigment";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import Student from "./pages/tutor/Student";

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((store) => store.user);

  useEffect(() => {
    const token=JSON.parse(sessionStorage.getItem("token"))
    dispatch(checkAuth(token));
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <div>
        <h1>Welcome to Learning Hub</h1>
    <h2>Explore Our Courses</h2>
    <p>Discover a wide range of courses designed to help you learn new skills and advance your career.</p>
    <a href="/courses">View All Courses</a>  
    <h2>Why Choose Us?</h2>
    <p>We offer expert instructors, hands-on projects, and a supportive learning community.</p>
    <a href="/about">Learn More About Us</a>  
    <p>Have questions? We'd love to hear from you!</p>
    <a href="/contact">Contact Us</a> 

        </div>
      

        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course/:id" element={<CourseMaterials />} />
        <Route path="/enroll/:id" element={<Enrollment />} />
        <Route path="/enroll/course-materials/:id" element={<Materials />} />
        <Route path="/assignment/get-assignment/:id" element={<SpecAssigment />} />

        {/* Tutor layout */}
        <Route
          path="/tutor"
          element={
            <CheckAuth user={user} isAuth={isAuth}>
              <TutorLayout />
            </CheckAuth>
          }
        >
          <Route path="upload" element={<CourseUpload />} />
          <Route path="assignment" element={<CreateAssessment />} />
          <Route path="Assessment/:id" element={<Assessment />} />
          <Route path="pupil" element={<Student />} />
        </Route>
        {/* Tutor layout */}

        {/* Student layout */}
        <Route
          path="/student"
          element={
            <CheckAuth user={user} isAuth={isAuth}>
              <StudentLayout />
            </CheckAuth>
          }
        >
          <Route path="performance" element={<Performance />} />
          <Route path="enrolled-courses" element={<Enrolled />} />
        </Route>
        {/* Authentication layout */}
        <Route
          path="/auth"
          element={
            <CheckAuth user={user} isAuth={isAuth}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
