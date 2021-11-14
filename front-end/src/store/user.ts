import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from ".";
import { api, User } from "../api/";

export const loginUserWithGoogle = createAsyncThunk(
  "user/loginUserWithGoogle",
  async (userId, thunkAPI) => {
    const result = await api.login({ provider: "google" });
    return result;
  }
);

const initialState: User = {
  id: "",
  name: "",
  email: "",
  podcasts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = { ...action.payload };
      return state;
    },
  },
});

// selectors for getting getting a user
export const userSelector = (state: StoreState) => state.user;

export type UserState = typeof initialState;
export const { setUser } = userSlice.actions;
export default userSlice;
