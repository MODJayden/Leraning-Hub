import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/assets/hooks/use-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment } from "@/store/assignment";

const Assessment = () => {
  const { id } = useParams();
  const {user}=useSelector(store=>store.user)
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState(null);
  const [uploadedImgUrl, setUploadedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  

  const [form, setForm] = useState({
    title: "",
    submissionRequirements: "",
    questions: "",
    deadline: "",
    grade: 0,
    status: "pending",
    courseId: id,
    tutorId:user.id
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setImgUrl(selectedFile);
  };
  const uploadImageToCloudinary = async () => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("thumbnail", imgUrl);

      const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/course/upload-thumbnail`,
        data
      );
      if (res?.data?.success) {
        setUploadedUrl(res?.data?.result?.secure_url);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (imgUrl) {
      uploadImageToCloudinary();
    }
  }, [imgUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ ...form, questions: uploadedImgUrl });
    dispatch(createAssignment(form)).then((res) => {
      console.log(res);
      
      if (res?.payload?.success) {
        toast({
          title: "Success!",
          description: "Assessment created successfully.",
        });
        setForm({
          title: "",
          submissionRequirements: "",
          questions: "",
          deadline: "",
          grade: 0,
          status: "pending",
          courseId: id,
        });
      }
    });
  };

  return (
    <div className="min-h-screen m-4">
      <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Create Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="materials"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Assignment
              </Label>
              <Input
                id="materials"
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Upload a PDF
              </p>
            </div>
            <div>
              <Label
                htmlFor="materials"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Deadline Date
              </Label>
              <Input
                id="materials"
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter assessment title"
                className="mt-1 block w-full"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="questions"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Submission Requirement
              </Label>
              <Textarea
                id="questions"
                value={form.submissionRequirements}
                onChange={(e) =>
                  setForm({ ...form, submissionRequirements: e.target.value })
                }
                placeholder="eg. All assignment format should be PDF, or Document"
                className="mt-1 block w-full"
                required
              />
            </div>
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
                type="submit"
                className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] w-full text-white hover:from-[#2575fc] hover:to-[#6a11cb] "
              >
                Create Assessment
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assessment;
