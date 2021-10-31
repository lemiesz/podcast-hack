import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA-EnpG01w0V7bQmCxq-ODAuVLBxSAWOL0",

  authDomain: "podcast-ting.firebaseapp.com",

  projectId: "podcast-ting",

  storageBucket: "podcast-ting.appspot.com",

  messagingSenderId: "1096665967080",

  appId: "1:1096665967080:web:ec3a4529c769958a419c5d",

  measurementId: "G-RLY9VCMNF6",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
}

export const analytics = getAnalytics(app);

export const googleAuthProvider = new GoogleAuthProvider();
export async function signInWithGoogle() {
  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    // const credential = GoogleAuthProvider.credentialFromResult(result)
    return {
      name: user.displayName,
      email: user.email,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return credential;
  }
}
