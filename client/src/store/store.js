import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import courseReducer from "./course";
import enrollReducer from "./enroll";
import assignmentReducer from "./assignment";
import submissionReducer from "./submision";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    enroll: enrollReducer,
    assignment: assignmentReducer,
    submission: submissionReducer,
  },
});

export default store;
