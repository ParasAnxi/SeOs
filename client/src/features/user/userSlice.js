//** IMPORTS */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//** API */
const USER_API = "http://localhost:3001/auth";
//** CONFIG */
const initialState = {
  theme: "light",
  user: null,
  token: null,
  status: "idle",
  error: null,
};
//** CREATE ACCOUNT */
export const userAccount = createAsyncThunk(
  "auth/createAccount",
  async (user) => {
    const response = await fetch(`${USER_API}/createAccount`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }
);
//** LOGIN */
export const userLogin = createAsyncThunk("auth/login", async (data) => {
  console.log(data);
  const response = await fetch(`${USER_API}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const userData = await response.json();
  return userData;
});
//** CHANGE PASSWORD */
export const changePassword = createAsyncThunk("auth/changePassword",async(data)=>{
  const response = await fetch(`${USER_API}/changePassword`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const userData = await response.json();
  return userData;
})
//** REDUCERS */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setNoError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = action.payload.error ? "error" : null;
      })
      .addCase(userAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userAccount.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error ? "error" : "noError";
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { setTheme, setLogOut, setNoError } = userSlice.actions;
export default userSlice.reducer;
