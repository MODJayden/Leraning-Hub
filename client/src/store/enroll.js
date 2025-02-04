import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const enrollCourse = createAsyncThunk("/enroll-course", async (form) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/enrollment/enroll-course`,
    form
  );
  return res?.data;
});
export const getEnrolledCourse = createAsyncThunk(
  "/download materials-course",
  async ({ studentId }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/enrollment/get/enrolled-course/${studentId}`
    );
    return res?.data;
  }
);
export const deleteEnrolledCourse = createAsyncThunk(
  "/delete/enrolled-course",
  async ({ id }) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/enrollment/delete/enrolled-course/${id}`
    );
    return res?.data;
  }
);
export const getCurrentEnrolledCourse = createAsyncThunk(
  "/getCurrent-enrolled-course",
  async ({ id }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/enrollment/getCurrent/enrolled-course/${id}`
    );
    
    return res?.data;
  }
);

const initialState = {
  isLoading: false,
  enroll: [],
  enrolledCourse: [],
  deletedCourse: [],
  currentCourse: [],
};

const enrollSlice = createSlice({
  name: "enroll-course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        (state.isLoading = false), (state.enroll = action.payload?.data);
      })
      .addCase(enrollCourse.rejected, (state) => {
        (state.isLoading = false), (state.enroll = []);
      })
      .addCase(getEnrolledCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnrolledCourse.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.enrolledCourse = action?.payload?.data);
      })
      .addCase(getEnrolledCourse.rejected, (state) => {
        (state.isLoading = false), (state.enrolledCourse = []);
      })
      .addCase(deleteEnrolledCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnrolledCourse.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.deletedCourse = action.payload?.data);
      })
      .addCase(deleteEnrolledCourse.rejected, (state) => {
        (state.isLoading = false), (state.deletedCourse = []);
      })
      .addCase(getCurrentEnrolledCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentEnrolledCourse.fulfilled, (state, action) => {
        (state.isLoading = false), (state.currentCourse = action.payload?.data);
      })
      .addCase(getCurrentEnrolledCourse.rejected, (state) => {
        (state.isLoading = false), (state.currentCourse = []);
      });
  },
});

export default enrollSlice.reducer;
