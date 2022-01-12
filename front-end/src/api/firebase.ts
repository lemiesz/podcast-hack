import { FirebaseError, initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    AuthError,
    FacebookAuthProvider,
    connectAuthEmulator,
} from 'firebase/auth'
import { DefinedAuthProviders } from '.'

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyA-EnpG01w0V7bQmCxq-ODAuVLBxSAWOL0',

    authDomain: 'podcast-ting.firebaseapp.com',

    projectId: 'podcast-ting',

    storageBucket: 'podcast-ting.appspot.com',

    messagingSenderId: '1096665967080',

    appId: '1:1096665967080:web:ec3a4529c769958a419c5d',

    measurementId: 'G-RLY9VCMNF6',
}

// Initialize Firebase

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
setPersistence(auth, browserLocalPersistence)

if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectStorageEmulator(storage, 'localhost', 9199)
}

export const analytics = getAnalytics(app)

export const googleAuthProvider = new GoogleAuthProvider()
export const facebookAuthProvider = new FacebookAuthProvider()
const providerMap = {
    google: googleAuthProvider,
    facebook: facebookAuthProvider,
}
export async function signInWithProviderPopup(provider: DefinedAuthProviders) {
    try {
        const { user } = await signInWithPopup(auth, providerMap[provider])
        return {
            name: user.displayName,
            email: user.email,
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            const authError = error as AuthError
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(authError)
            return credential
        }
    }
}
