import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCourse = createAsyncThunk("/create-course", async (form) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/course/create-course`,
    form
  );
  return res?.data;
});
export const fetchCourseForTutor = createAsyncThunk(
  "/fetch-course",
  async ({ tutorId }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/course/get-course/${tutorId}`
    );
    return res?.data;
  }
);
export const fetchAllCourse = createAsyncThunk("/fetchAll-course", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course/getAll-course`);
  return res?.data;
});

export const fetchCourseDetails = createAsyncThunk(
  "/fetch-course/details",
  async ({ id }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/course/get/course-details/${id}`
    );
    return res?.data;
  }
);

export const deleteCourse = createAsyncThunk(
  "/delete-course",
  async ({ id }) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/course/delete-course/${id}`
    );
    return res?.data;
  }
);

const initialState = {
  isLoading: false,
  courses: [],
  tutorCourse: [],
  allCourses: [],
  courseDetail: null,
  deletedCourse: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        (state.isLoading = false), (state.courses = action.payload.data);
      })
      .addCase(createCourse.rejected, (state) => {
        (state.isLoading = true), (state.courses = null);
      })
      .addCase(fetchCourseForTutor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseForTutor.fulfilled, (state, action) => {
        (state.isLoading = false), (state.tutorCourse = action.payload.data);
      })
      .addCase(fetchCourseForTutor.rejected, (state) => {
        (state.isLoading = true), (state.tutorCourse = null);
      })
      .addCase(fetchAllCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCourse.fulfilled, (state, action) => {
        (state.isLoading = false), (state.allCourses = action?.payload?.data);
      })
      .addCase(fetchAllCourse.rejected, (state) => {
        (state.isLoading = true), (state.allCourses = null);
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.courseDetail = action?.payload?.data);
      })
      .addCase(fetchCourseDetails.rejected, (state) => {
        (state.isLoading = true), (state.courseDetail = null);
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.deletedCourse = action?.payload?.data);
      })
      .addCase(deleteCourse.rejected, (state) => {
        (state.isLoading = true), (state.deletedCourse = null);
      });
  },
});

export default courseSlice.reducer;
