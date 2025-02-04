import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";
import { getEnrolledAssignment } from "@/store/assignment";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/assets/hooks/use-toast";
import { fetchSubmissionForStudent, submitAssignment } from "@/store/submision";

const SpecAssigment = () => {
  const { id } = useParams();
  const { enrolledAssignment } = useSelector((store) => store.assignment);
  const { Submitted } = useSelector((store) => store.submission);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [assignment, setAssignment] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const myRef = useRef();
  const { toast } = useToast();
  const [assId, setAssId] = useState("");

  const handleDownload = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const fileName = fileUrl.split("/").pop();
      const blob = new Blob([arrayBuffer], {
        type: response.headers.get("Content-Type"),
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error(`Error occurred while downloading file: ${error.message}`);
    }
  };

  const handleAssignmentChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFileUrl(selectedFile);
  };
  const uploadFileToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", fileUrl);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/course/upload-thumbnail`,
        data
      );
      if (res?.data?.success) {
        setUploadedUrl(res?.data?.result?.secure_url);
        setAssignment(uploadedUrl);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (fileUrl) {
      uploadFileToCloudinary();
    }
  }, [fileUrl]);

  useEffect(() => {
    dispatch(getEnrolledAssignment({ enrolledId: id }));
  }, [dispatch]);

  const handleAssignmentStatus = (assessment) => {
    setAssId(assessment);
    dispatch(
      fetchSubmissionForStudent({
        assignmentId: assessment,
        studentId: user.id,
      })
    );
  };

  const handleSubmitAssignment = () => {
    setAssignment(uploadedUrl);

    dispatch(
      submitAssignment({
        submission: assignment,
        studentId: user.id,
        assignmentId: assId,
        status: "pending",
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(getEnrolledAssignment({ enrolledId: id }));
        setIsDialogOpen(false);
        toast({
          title: "Success!",
          description: res?.payload?.message,
        });
        setAssignment("");
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen p-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Assignments
        </h1>
        {enrolledAssignment?.length >= 1 ? (
          <div className="space-y-6">
            {enrolledAssignment.map((assignment, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Assignment Title */}
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">{assignment.title}</h2>
                </div>

                {/* Submission Requirements */}
                <div className="mb-4">
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">
                      Submission Requirements:
                    </span>{" "}
                    {assignment.submissionRequirements}
                  </p>
                </div>

                {/* Questions File */}
                <div className="mb-4">
                  <div className="flex items-center flex-wrap">
                    <div className="bg-gray-100 p-2 rounded-full mr-4 ">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-lg text-gray-800">Questions:</p>
                    <button
                      className="flex items-center ml-4 bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                      onClick={() => handleDownload(assignment.questions)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Deadline */}
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-4">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-lg text-gray-800">
                      <span className="font-semibold">Deadline:</span>
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Grade */}

                <div className=" w-full flex justify-center items-center flex-wrap  mt-3">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger>
                      <button
                        onClick={() => handleAssignmentStatus(assignment._id)}
                        className={`flex items-center ml-4 bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300  `}
                      >
                        Submit Assignment
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assignment Submission</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        {Submitted?.[0]?.status === "submitted" ||
                        Submitted?.[0]?.status === "graded" ? (
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-full mr-4 ${
                                Submitted?.[0].status === "pending"
                                  ? "bg-yellow-100"
                                  : Submitted?.[0].status === "submitted"
                                  ? "bg-blue-100"
                                  : "bg-green-100"
                              }`}
                            >
                              {Submitted?.[0].status === "pending" ? (
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                              ) : Submitted?.[0].status === "submitted" ? (
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <p className="text-lg text-gray-800">
                              <span className="font-semibold">Status:</span>{" "}
                              <span
                                className={`${
                                  Submitted?.[0].status === "pending"
                                    ? "text-yellow-600"
                                    : Submitted?.[0].status === "submitted"
                                    ? "text-blue-600"
                                    : "text-green-600"
                                }`}
                              >
                                {Submitted?.[0].status}
                              </span>
                              <span>
                                {Submitted?.[0].status === "graded" ? (
                                  <span className="font-medium">
                                    {" "}
                                    - {Submitted[0]?.grade}
                                  </span>
                                ) : null}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div>
                            <h3>
                              Note: Make sure the Assignment, meet all the
                              submisson requirements
                            </h3>
                            <Label
                              htmlFor="materials"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            ></Label>
                            <Input
                              id="materials"
                              ref={myRef}
                              required
                              type="file"
                              className="mt-3 block w-full"
                              onChange={handleAssignmentChange}
                            />
                            <div className=" w-full flex justify-center items-center flex-wrap  mt-3">
                              {isUploading ? (
                                <Button
                                  disabled
                                  className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white hover:from-[#2575fc] hover:to-[#6a11cb] w-full"
                                >
                                  <Loader2 className="animate-spin" />
                                  Please wait
                                </Button>
                              ) : (
                                <Button
                                  onClick={handleSubmitAssignment}
                                  className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] w-full text-white hover:from-[#2575fc] hover:to-[#6a11cb] "
                                >
                                  Submit
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-300 w-full text-center text-2xl">
            No Assignment{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecAssigment;

/* {assignment.status === "graded" && (
                 
                )}

               
                 */
