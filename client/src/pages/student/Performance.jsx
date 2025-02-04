// src/pages/Performance.jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getEnrolledCourse } from "@/store/enroll";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Performance = () => {
  const { enrolledCourse } = useSelector((store) => store.enroll);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEnrolledCourse({ studentId: user.id }))
  }, [dispatch]);


  return (
    <div className="min-h-screen   p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Performance</h1>
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
            Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800 dark:text-white">
                  Assessment
                </TableHead>
                <TableHead className="text-gray-800 dark:text-white">
                  Score
                </TableHead>
                <TableHead className="text-gray-800 dark:text-white">
                  Total
                </TableHead>
                <TableHead className="text-gray-800 dark:text-white">
                  Percentage
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrolledCourse?.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="text-gray-800 dark:text-white">
                    {assessment?.courseId?.courseTitle}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-white">
                    {assessment?.courseProgress}
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-white">
                    100
                  </TableCell>
                  <TableCell className="text-gray-800 dark:text-white">
                    {(assessment?.courseProgress / 100) * 100}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;
