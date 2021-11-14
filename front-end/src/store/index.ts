import { configureStore } from "@reduxjs/toolkit";
import user, { setUser } from "./user";
import podcastReducer from "./podcast";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: user.reducer,
    podcast: podcastReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;

// Provides a correctly typed app dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Convience function that wraps selectors with the proper store types
 */
export const useTypedSelect = function <SelectedVal>(
  s: (state: StoreState) => SelectedVal
) {
  return useSelector(s);
};
/**
 * when the auth state has change "User Logs in", then we want to automatically updated
 * our state store with this data;
 */
auth.onAuthStateChanged((a) => {
  if (!a) {
    return setUser({ id: "", name: "", email: "", podcasts: [] });
  }
  store.dispatch(
    setUser({
      id: a.uid,
      name: a.displayName ?? "not_found",
      email: a.email ?? "not_found",
      podcasts: [],
    })
  );
});

export default store;
