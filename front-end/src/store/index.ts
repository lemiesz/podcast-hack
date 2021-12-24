import { configureStore } from '@reduxjs/toolkit'
import user, { setUser } from './user'
import podcastReducer from './podcast'
import { auth } from '../api/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'

const store = configureStore({
    reducer: {
        user: user.reducer,
        podcast: podcastReducer,
    },
})

export type StoreState = ReturnType<typeof store.getState>

// Provides a correctly typed app dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Convience function that wraps selectors with the proper store types
 */
export const useTypedSelect = function <SelectedVal>(
    s: (state: StoreState) => SelectedVal
) {
    return useSelector(s)
}
/**
 * when the auth state has change "User Logs in", then we want to automatically updated
 * our state store with this data;
 */
auth.onAuthStateChanged((a) => {
    if (!a) {
        return setUser({ id: '', name: '', email: '', podcasts: [] })
    }
    api.getUserData({ id: a.uid })
        .then((user) => {
            if (!user) {
                throw Error(
                    'Could not find user data for current authenticated user.'
                )
            }
            store.dispatch(setUser(user))
        })
        .catch((err) => console.error(err))
})

export default store
