import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const submitAssignment = createAsyncThunk(
  "/submit-assignment",
  async ({submission, status, studentId, assignmentId }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/submission/submit-assignment`,
      {submission, status, studentId, assignmentId }
    );
    return res?.data;
  }
);
export const fetchSubmissionForStudent = createAsyncThunk(
  "/get/submitted-assignment",
  async ({ assignmentId, studentId }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/submission/get/submitted-assignment/${assignmentId}/${studentId}`
    );

    return res?.data;
  }
);
export const gradeAssignmentUpdate = createAsyncThunk(
  "/get/tutor/update-assignment",
  async ({ submissionId, grade,studentId }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/submission/update/grade-assignment/${submissionId}`,
      { grade, studentId }
    );
    
    return res?.data;
  }
);
export const fetchSubmissionForTutor = createAsyncThunk(
  "/get/tutor/submitted-assignment",
  async ({ tutorId }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/submission/get/tutor/${tutorId}`
    );

    return res?.data;
  }
);

const initialState = {
  isLoading: false,
  submittedAssignment: null,
  Submitted: null,
  AllSubmitted: null,
  updatedGrade:null
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.submittedAssignment = action.payload?.data);
      })
      .addCase(submitAssignment.rejected, (state) => {
        (state.isLoading = false), (state.submittedAssignment = []);
      })
      .addCase(fetchSubmissionForStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubmissionForStudent.fulfilled, (state, action) => {
        (state.isLoading = false), (state.Submitted = action.payload?.data);
      })
      .addCase(fetchSubmissionForStudent.rejected, (state) => {
        (state.isLoading = false), (state.Submitted = []);
      })
      .addCase(fetchSubmissionForTutor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubmissionForTutor.fulfilled, (state, action) => {
        (state.isLoading = false), (state.AllSubmitted = action.payload?.data);
      })
      .addCase(fetchSubmissionForTutor.rejected, (state) => {
        (state.isLoading = false), (state.AllSubmitted = []);
      })
      .addCase(gradeAssignmentUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gradeAssignmentUpdate.fulfilled, (state, action) => {
        (state.isLoading = false), (state.updatedGrade = action.payload?.data);
      })
      .addCase(gradeAssignmentUpdate.rejected, (state) => {
        (state.isLoading = false), (state.updatedGrade = []);
      });
  },
});

export default submissionSlice.reducer;
