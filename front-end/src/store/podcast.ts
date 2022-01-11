import {
    createAction,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { api, Podcast } from '../api'

//TYPE CONSTANTS
const LOAD = 'podcast/load'
const ADD = 'podcast/add'
const EDIT = 'podcast/edit'
const REMOVE = 'podcast/delete'

export const load = createAction<Podcast>(LOAD)
export const edit = createAction<Podcast>(EDIT)
export const add = createAction<Podcast>(ADD)
export const remove = createAction<Podcast>(REMOVE)

//Thunks
export const fetchPodcastById = createAsyncThunk(
    'podcast/fetchPodcast',
    async (id: string, thunkAPI) => {
        const response = await api.getPodcast({ id })
        if (!response) {
            throw thunkAPI.rejectWithValue(new Error('Could not fetch podcast'))
        }
        return response
    }
)

export const podcastUpload = (podcastInfo: any) => async (dispatch: any) => {
    // commenting out as this is incompatible with the current api defenition
    // lets circle back on this when we have a clear idea of what our upload flow will look like
    // on the backend
    //   const { selectedFile, podCastName, podDesc } = podcastInfo;
    //   const data = await api.uploadPodcast({ selectedFile, podCastName, podDesc });
    //   if (data.ok) {
    //     return dispatch(add(data));
    //   }
}

const initialState: Record<string, Podcast> = {}

const podcastsSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        setPodcasts: (
            state,
            action: PayloadAction<Record<string, Podcast>>
        ) => {
            state = {
                ...state,
                ...action.payload,
            }
            return state as Record<string, Podcast>
        },
        loadPodcast: (state, action: PayloadAction<Podcast>) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPodcastById.fulfilled, (state, action) => {
            state = {
                ...state,
                [action.payload.id]: action.payload,
            }
            return state
        })
    },
})

export default podcastsSlice
