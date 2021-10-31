import Login from "./components/login/component";
import UploadPodcast from "./components/uploadpodcast/index.js";
import { auth } from "./firebase";

export const Routes = [
  {
    path: "/",
    component: () => {
      return JSON.stringify(auth.currentUser.toJSON());
    },
    exact: true,
  },
  {
    path: "/upload",
    component: UploadPodcast,
    exact: true,
  },
];
