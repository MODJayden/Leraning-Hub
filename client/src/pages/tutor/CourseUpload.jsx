// src/pages/CourseUpload.jsx
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/assets/hooks/use-toast";
import { FaPlusCircle } from "react-icons/fa";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  createCourse,
  deleteCourse,
  fetchCourseForTutor,
} from "@/store/course";
import { Link } from "react-router-dom";

const CourseUpload = () => {
  const { toast } = useToast();
  const { user } = useSelector((store) => store.user);
  const { tutorCourse } = useSelector((store) => store.course);

  const [sheetOpen, setSheetOpen] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    courseTitle: "",
    courseDescription: "",
    courseMaterials: "",
    tutorId: user.id,
    courseThumbnail: "",
  });

  const [couseMaterialImg, setCourseMaterialImg] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrls] = useState(null);
  const [courseThumbnail, setCourseThumbnail] = useState();
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState(null);

  const [uploading, setIsUploading] = useState(false);

  const handleThumbnailChange = async (e) => {
    const selectedImg = e.target.files?.[0];
    setCourseThumbnail(selectedImg);
  };

  const uploadImageToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", courseThumbnail);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/course/upload-thumbnail`,
        data
      );
      if (res?.data?.success) {
        setUploadedThumbnailUrl(res?.data?.result?.secure_url);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsUploading(false);
    }
  };
  const handleDeleteCourse = (id) => {
    dispatch(deleteCourse({ id: id })).then((res) => {
      if (res?.payload.success) {
        dispatch(fetchCourseForTutor({ tutorId: user.id }));
        toast({
          title: "Success !",
          description: res.payload.message,
        });
      }
    });
  };

  useEffect(() => {
    if (courseThumbnail) {
      uploadImageToCloudinary();
    }
  }, [courseThumbnail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      courseMaterials: uploadedImageUrl,
      courseThumbnail: uploadedThumbnailUrl,
    });
    dispatch(createCourse(formData)).then((res) => {
      if (res?.payload.success) {
        dispatch(fetchCourseForTutor({ tutorId: user.id }));
        setFormData(formData);
        setSheetOpen(false);
        toast({
          title: "Success!",
          description: "Course uploaded successfully.",
        });
      }else{
        toast({
          
          description: "Verify all fields...",
        });
      }
    });
  };
  useEffect(() => {
    dispatch(fetchCourseForTutor({ tutorId: user.id }));
  }, []);

  const handleCourseMaterialChange = (e) => {
    const selectedImg = e.target.files;
    setCourseMaterialImg(selectedImg);
  };

  const uploadCourseMaterialsToCloudinary = async () => {
    try {
      setIsUploading(true); // Add a loading state
      const data = new FormData();

      const files = Array.from(couseMaterialImg);
      files.forEach((file, index) => {
        data.append(`course`, file);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/course/upload`,
        data
      );
      if (res?.data?.success) {
        const uploadedUrls = res?.data?.results?.map(
          (result) => result?.secure_url
        );
        setUploadedImageUrls(uploadedUrls);
      } else {
        console.log("Upload failed:", res?.data?.message);
      }
    } catch (error) {
      console.log("Error uploading images:", error.message);
    } finally {
      setIsUploading(false); // Reset the loading state
    }
  };

  useEffect(() => {
    if (couseMaterialImg) {
      uploadCourseMaterialsToCloudinary();
    }
  }, [couseMaterialImg]);

  return (
    <main className="container mx-auto p-8 flex-grow min-h-screen">
      <div className="w-full flex justify-end ">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <span className="flex cursor-pointer gap-1 justify-center items-center border rounded-xl p-1 my-4 text-2xl text-[#a435f0]">           <FaPlusCircle
              className="cursor-pointer text-2xl text-[#a435f0]"
              title="Add course"
            /> Upload course
            </span>
 
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Course</SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <div className=" p-4">
                <form className="space-y-6">
                  <div>
                    <Label
                      htmlFor="materials"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Course Materials
                    </Label>
                    <Input
                      id="materials"
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleCourseMaterialChange}
                      multiple
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Upload PDFs, videos, or other materials for the course.
                    </p>
                  </div>
                  <div>
                    <Label
                      htmlFor="materials"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Thumbnail
                    </Label>
                    <Input
                      id="materials"
                      type="file"
                      className="mt-1 block w-full"
                      onChange={handleThumbnailChange}
                      multiple
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Upload a course Thumbnail
                    </p>
                  </div>
                  <div>
                    <Label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Course Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter course title"
                      value={formData.courseTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          courseTitle: e.target.value,
                        })
                      }
                      className="mt-1 block w-full"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Course Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter course description"
                      className="mt-1 block w-full"
                      value={formData.courseDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          courseDescription: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {uploading ? (
                    <Button
                      disabled
                      className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white hover:from-[#2575fc] hover:to-[#6a11cb] w-full"
                    >
                      <Loader2 className="animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white hover:from-[#2575fc] hover:to-[#6a11cb] w-full"
                    >
                      Upload Course
                    </Button>
                  )}
                </form>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
      <h2 className="mb-4 text-2xl font-medium text-gray-400">
        My Uploaded courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(tutorCourse) && tutorCourse.length > 0 ? (
          tutorCourse?.map((course) => (
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
                <div>
                  <button
                    className="mt-4 w-full bg-[#a435f0] text-white py-2 rounded-lg hover:bg-[#4a1fb8] focus:outline-none focus:ring-2 focus:ring-[#a435f0]"
                    onClick={() => handleDeleteCourse(course?._id)}
                  >
                    Delete course
                  </button>
                  <Link to={`/tutor/assessment/${course?._id}`}>
                    <button className="mt-4 w-full bg-[#a435f0] text-white py-2 rounded-lg hover:bg-[#4a1fb8] focus:outline-none focus:ring-2 focus:ring-[#a435f0]">
                      Create Assessment
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-2xl font-medium text-gray-500">
            {" "}
            No uploads
          </div>
        )}
      </div>
    </main>
  );
};

export default CourseUpload;

/*  */
