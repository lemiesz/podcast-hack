import { initializeApp } from "firebase/app";

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

export const analytics = getAnalytics(app);

