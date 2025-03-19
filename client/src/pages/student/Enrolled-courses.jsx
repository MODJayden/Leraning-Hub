// src/pages/CourseTracking.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnrolledCourse, getEnrolledCourse } from "@/store/enroll";
import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/assets/hooks/use-toast";

const Enrolled = () => {
  const { enrolledCourse } = useSelector((store) => store.enroll);
  const { user } = useSelector((store) => store.user);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnrolledCourse({ studentId: user?.id }));
  }, [dispatch]);

  const handleDropCourse = (id) => {
    dispatch(deleteEnrolledCourse({ id: id })).then((res) => {
      if (res?.payload?.success) {
        dispatch(getEnrolledCourse({ studentId: user?.id }));
        toast({
          title: "Success",
          description: res?.payload?.message,
        });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-400 text-center mt-4">
        Your Enrolled Courses
      </h1>
      {enrolledCourse?.length >= 1 ? (
        <main className="container mx-auto p-8 flex-grow">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {enrolledCourse?.map((course) => (
              <div
                key={course.courseId._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <img
                  src={course?.courseId?.courseThumbnail}
                  alt={course?.courseId?.courseTitle}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-[#1c1d1f]">
                    {course?.courseId?.courseTitle}
                  </h3>
                  <p className="text-gray-600 mb-2">{course?.studentName}</p>
                  <p className="text-gray-600 mb-4">
                    Payment Status:{" "}
                    <span
                      className={`${
                        course?.payment === "unpaid"
                          ? "bg-yellow-100 p-1 px-4 rounded-2xl"
                          : "bg-green-200 p-1 px-4 rounded-2xl"
                      }`}
                    >
                      {course.payment.toUpperCase()}{" "}
                    </span>
                  </p>
                  <div className="w-full flex gap-2  justify-center">
                    {course?.payment === "unpaid" ? (
                      <Button
                        variant="outline"
                        className="bg-[#a435f0] text-white px-3 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={true}
                      >
                        View Materials
                      </Button>
                    ) : (
                      <Link to={`/enroll/course-materials/${course._id}`}>
                        <Button
                          variant="outline"
                          className="bg-[#a435f0] text-white px-3 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          View Materials
                        </Button>
                      </Link>
                    )}
                    {course?.payment === "unpaid" ? (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            variant="outline"
                            className="bg-[#a435f0] text-white px-3 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Register
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>PAYMENT DETAILS</AlertDialogTitle>
                            <AlertDialogDescription>
                              <p>
                                Network: <strong>MTN</strong>
                              </p>
                              <br />
                              <p>
                                MOMO ACCOUNT: <strong>0257479336</strong>{" "}
                              </p>
                              <br />
                              <p>
                                ACCOUNT NAME: <strong>CHARLES MANTEY</strong>{" "}
                              </p>
                              <br />
                              <p>
                                REGISTRATION FEE: <strong>GHS100</strong>{" "}
                              </p>
                              <br />
                              <p>
                                REFERENCE: <strong>Your NAME</strong>{" "}
                              </p>{" "}
                              <br />
                              Note:
                              <strong className="text-red-300">
                                {" "}
                                PAYMENT WILL BE CONFIRMED SOON
                              </strong>
                              <p></p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            variant="outline"
                            className="bg-[#a435f0] text-white px-3 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Drop Course
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the enrolled course.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDropCourse(course?._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div className="text-2xl text-gray-300 text-center">
          You have not enrolled in any course
        </div>
      )}
    </div>
  );
};

export default Enrolled;

/*   */
