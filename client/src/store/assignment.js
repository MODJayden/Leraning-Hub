import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createAssignment = createAsyncThunk(
  "/create-assignment",
  async (form) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/assignment/create-assignment`,
      form
    );
    return res?.data;
  }
);
export const getEnrolledAssignment = createAsyncThunk(
  "/get-assignment",
  async ({ enrolledId }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/assignment/get/enrolled-assignment/${enrolledId}`
    );
    return res?.data;
  }
);

const initialState = {
  isLoading: false,
  assignment: [],
  enrolledAssignment: [],
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        (state.isLoading = false), (state.assignment = action.payload?.data);
      })
      .addCase(createAssignment.rejected, (state) => {
        (state.isLoading = false), (state.assignment = []);
      })
      .addCase(getEnrolledAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrolledAssignment.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.enrolledAssignment = action.payload?.data);
      })
      .addCase(getEnrolledAssignment.rejected, (state) => {
        (state.isLoading = false), (state.enrolledAssignment = []);
      });
  },
});

export default assignmentSlice.reducer;
