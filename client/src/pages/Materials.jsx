import { getCurrentEnrolledCourse } from "@/store/enroll";
import React, { useEffect } from "react";
import { FileText, Download } from "lucide-react"; // Import Lucide icons
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const getProgressColor = (progress) => {
  if (progress <= 30) {
    return "bg-red-500"; // Red for low progress
  } else if (progress <= 70) {
    return "bg-yellow-500"; // Yellow for moderate progress
  } else {
    return "bg-green-500"; // Green for high progress
  }
};


const Materials = () => {
  const { id } = useParams();
  const { currentCourse } = useSelector((store) => store.enroll);
  const dispatch = useDispatch();
  const progressColor = getProgressColor(currentCourse.courseProgress);

  useEffect(() => {
    dispatch(getCurrentEnrolledCourse({ id: id }));
  }, [dispatch]);
  const handleDownload = async () => {
    try {
      const materials = currentCourse?.courseId?.courseMaterials;
      if (materials?.length > 0) {
        const zip = new JSZip();
        for (const material of materials) {
          const response = await fetch(material);
          const arrayBuffer = await response.arrayBuffer();
          const fileName = material.split("/").pop();
          zip.file(fileName, arrayBuffer);
        }

        const zipBuffer = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBuffer);
        link.download = "course-materials.zip";
        link.click();
      } else {
        console.log("No course materials found.");
      }
    } catch (error) {
      console.error(
        "Error occurred while downloading course materials:",
        error.message
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Card className="m-4 md:m-8 p-4">
        <CardContent>
          {/* Course Progress Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Course Progress</h2>
            <div className="flex items-center space-x-4">
              <Progress value={currentCourse?.courseProgress} className={`h-3 flex-1 ${progressColor}`}  />
              <span className="text-lg font-semibold">{currentCourse?.courseProgress}%</span>
            </div>
          </div>

          {/* Course Materials Section */}
          <div className="property-materials mb-6">
            {/* Section Header */}
            <div className="flex flex-wrap items-center mb-4 justify-between">
              <div className="flex justify-center items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Course Materials</h2>
              </div>

              <button
                onClick={handleDownload}
                className="mt-4 flex items-center bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>

            {/* Course Materials List */}
            <div className="space-y-4">
              {currentCourse?.courseId?.courseMaterials?.map(
                (material, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Material Info */}
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="bg-gray-100 p-2 rounded-full mr-4">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="text-lg text-gray-800 break-words">
                        {material.name || currentCourse?.courseId.courseTitle}
                      </p>
                    </div>

                  
                  </div>
                )
              )}
            </div>
          </div>

          {/* View Assignment Button */}
          <div className="flex justify-center w-full">
            <Link to={`/assignment/get-assignment/${currentCourse._id}`}>
              <Button className="mt-4 flex items-center bg-[#a435f0] hover:bg-[#4a1fb8] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                View Assignment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Materials;
