import { configureStore } from "@reduxjs/toolkit";
import user, { setUser } from "./user";
import podcastReducer from "./podcast";
import { auth } from "../firebase";

const store = configureStore({
  reducer: {
    user: user.reducer,
    podcastReducer,
  },
});

/**
 * when the auth state has change "User Logs in", then we want to automatically updated
 * our state store with this data;
 */
auth.onAuthStateChanged((a) => {
  if (!a) {
    return setUser({ id: "", userName: "", email: "" });
  }
  const user = a.toJSON();
  store.dispatch(
    setUser({ id: a.uid, userName: user.displayName, email: user.email })
  );
});

export default store;
