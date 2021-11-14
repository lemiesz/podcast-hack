import api from "../api";

//TYPE CONSTANTS
const LOAD = "podcast/load";
const ADD = "podcast/add";
const EDIT = "podcast/edit";
const REMOVE = "podcast/delete";

// ACTION CREATORS

const load = (podcast) => ({
    type: LOAD,
    podcast
})

const edit = (podcast) => ({
    type: EDIT,
    podcast
})

const add = (podcast) => ({
    type: ADD,
    podcast
})

const remove = (podcast) => ({
    type: REMOVE,
    podcast
})

//Thunks

export const podcastUpload = (podcastInfo) => async (dispatch) => {

    const { selectedFile, podCastName, podDesc  } = podcastInfo

    const data = await api.uploadPodcast({ selectedFile, podCastName, podDesc });

    if (data.ok) {
       return dispatch(add(data))
    }
}

const initialState = {};

const podcastReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            const newState = {
                ...state,
                [action.podcast.id]: action.podcast
            }
            return newState
        default:
            return initialState;
    }
}

export default podcastReducer;