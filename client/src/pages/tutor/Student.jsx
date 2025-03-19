import { getEnrolledStudent } from "@/store/enroll";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PaymentUpdate from "@/components/PaymentUpdate";

const Student = () => {
  const { enrolledStudent } = useSelector((store) => store.enroll);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollId, setEnrollId] = useState(null);

  const filteredCourses = enrolledStudent?.filter(
    (pro) =>
      pro.studentName.toLocaleLowerCase().includes(searchTerm) ||
      pro.courseId.courseTitle.toLocaleLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    dispatch(getEnrolledStudent({ tutorId: user?.id })).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Enrolled Students</h1>
      <div className="container mx-auto text-center my-8">
        <form className="flex justify-center">
          <input
            type="text"
            placeholder="Search by  Student name,course title"
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
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Student Course</TableHead>
            <TableHead>Enrolled Date</TableHead>
            <TableHead>Course Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses?.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student?.studentName}</TableCell>
              <TableCell>{student?.courseId?.courseTitle}</TableCell>
              <TableCell>{student?.createdAt.slice(0, 10)}</TableCell>
              <TableCell>{student?.courseProgress}%</TableCell>
              {student?.payment === "paid" ? (
                <TableCell className="text-green-500">Paid</TableCell>
              ) : (
                <TableCell>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger
                      onClick={() => setEnrollId(student?._id)}
                      className="bg-black text-white py-1 px-3 rounded-lg"
                    >
                      Update
                    </DialogTrigger>
                    <PaymentUpdate enrollId={enrollId} setOpen={setOpen} />
                  </Dialog>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Student;
