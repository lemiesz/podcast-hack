import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import podcastReducer from './podcast';

const store = configureStore({
  reducer: {
      user: user.reducer,
      podcastReducer
  },
});

export default store;
