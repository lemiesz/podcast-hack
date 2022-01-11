import { configureStore } from '@reduxjs/toolkit'
import user, { setUser } from './user'
import podcastReducer from './podcast'
import { auth } from '../api/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'
import { doc, onSnapshot } from 'firebase/firestore'

const store = configureStore({
    reducer: {
        user: user.reducer,
        podcasts: podcastReducer.reducer,
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
let unsubscribeUserListener = () => {}
auth.onAuthStateChanged((a) => {
    unsubscribeUserListener()
    if (!a) {
        return setUser({ id: '', name: '', email: '', podcasts: [] })
    }
    // subscribe to changes to the user
    unsubscribeUserListener = onSnapshot(
        doc(api.userCollection, a.uid),
        (snap) => {
            const user = snap.data()
            if (!user) {
                throw Error(
                    'Could not find user data for current authenticated user.'
                )
            }
            store.dispatch(setUser(user))
        }
    )
})

export default store
