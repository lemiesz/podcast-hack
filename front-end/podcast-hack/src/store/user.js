import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const loginUserWithGoogle = createAsyncThunk(
  "user/loginUserWithGoogle",
  async (userId, thunkAPI) => {
      const result = await api.login({provider: "google"});
      return result;
  }
);

const initialState = {
  id: "",
  userName: "",
  relatedPodcasts: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        state.userName = action.payload.name;
        state.email = action.payload.email;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;
