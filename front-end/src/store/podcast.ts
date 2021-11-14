import { createAction, createReducer } from "@reduxjs/toolkit";
import { Podcast } from "../api";

//TYPE CONSTANTS
const LOAD = "podcast/load";
const ADD = "podcast/add";
const EDIT = "podcast/edit";
const REMOVE = "podcast/delete";

export const load = createAction<Podcast>(LOAD);
export const edit = createAction<Podcast>(EDIT);
export const add = createAction<Podcast>(ADD);
export const remove = createAction<Podcast>(REMOVE);

//Thunks
export const podcastUpload = (podcastInfo: any) => async (dispatch: any) => {
  // commenting out as this is incompatible with the current api defenition
  // lets circle back on this when we have a clear idea of what our upload flow will look like
  // on the backend
  //   const { selectedFile, podCastName, podDesc } = podcastInfo;
  //   const data = await api.uploadPodcast({ selectedFile, podCastName, podDesc });
  //   if (data.ok) {
  //     return dispatch(add(data));
  //   }
};

const initialState: Record<string, Podcast> = {};

const podcastReducer = createReducer(initialState, (builder) => {
  builder.addCase(add, (state, action) => {
    state[action.payload.id] = action.payload;
  });
});

export default podcastReducer;
