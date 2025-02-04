import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "/auth/create",
  async ({ form }) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/data/create`,
      form,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);
export const changePassword = createAsyncThunk(
  "/auth/change",
  async ({ form,id }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/data/update/${id}`,
      form,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (form ) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/data/login`, form, {
    withCredentials: true,
  });
  return res?.data;
});

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-control": "must-revalidate,proxy-revalidate,no-cache,no-store",
    },
  });

  return res.data;
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/data/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
});

const initialState = {
  isAuth: false,
  isLoading: false,
  user: null,
  password:null
  
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.data;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        (state.isAuth = true), (state.user = action.payload?.data);
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
       (state.password = action.payload);
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = true;
        state.password = null;
  
      });
  },
});

export default userSlice.reducer;
