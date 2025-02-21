import {
  fetchSubmissionForTutor,
  gradeAssignmentUpdate,
} from "@/store/submision";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, FileText } from "lucide-react";

const CreateAssessment = () => {
  const { AllSubmitted } = useSelector((store) => store.submission);
  const { user } = useSelector((store) => store.user);
  const [grade, setGrade] = useState(0);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = AllSubmitted?.filter(
    (pro) =>
      pro.assignmentId.title.toLocaleLowerCase().includes(searchTerm) ||
      pro.studentId.firstName.toLocaleLowerCase().includes(searchTerm) ||
      pro.studentId.lastName.toLocaleLowerCase().includes(searchTerm)
  );

  console.log(AllSubmitted);

  const handleSaveGrade = (subId, studentId) => {
    dispatch(
      gradeAssignmentUpdate({
        submissionId: subId,
        grade: grade,
        studentId: studentId,
      })
    ).then(() => {
      dispatch(fetchSubmissionForTutor({ tutorId: user.id }));
    });
  };

  useEffect(() => {
    dispatch(fetchSubmissionForTutor({ tutorId: user.id }));
  }, [dispatch]);
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Student Submissions</h1>
      <div className="container mx-auto text-center my-8">
        <form className="flex justify-center">
          <input
            type="text"
            placeholder="Search by Assignment title, Student name,AssignmentStatus"
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
      {filteredCourses?.length >= 1 ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Assignment Title</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Submission</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses?.map((submission, index) => (
              <TableRow key={index}>
                <TableCell>
                  {submission?.studentId?.firstName}{" "}
                  {submission?.studentId?.lastName}
                </TableCell>
                <TableCell>{submission?.assignmentId?.title}</TableCell>
                <TableCell>
                  <a
                    href={submission?.assignmentId?.questions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Questions
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={submission?.submission}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Submission
                  </a>
                </TableCell>
                <TableCell>
                  {submission?.status === "graded" ? (
                    <div className="mb-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-lg text-gray-800">
                          <span className="font-semibold">Grade:</span>
                          <span className="font-semibold">
                            {" "}
                            {submission.grade}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        onChange={(e) => setGrade(e.target.value)}
                        min={0}
                        max={100}
                        className="w-20"
                      />
                      <Button
                        onClick={() =>
                          handleSaveGrade(
                            submission?._id,
                            submission?.studentId._id
                          )
                        }
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full text-center text-2xl text-gray-400">
          No Assignment Submission
        </div>
      )}
    </div>
  );
};

export default CreateAssessment;
