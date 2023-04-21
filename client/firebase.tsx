// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpqNYJWENESvxddbtgE4K0VyWHqi8rRaE",
  authDomain: "mern-twitter-clone-bfbba.firebaseapp.com",
  projectId: "mern-twitter-clone-bfbba",
  storageBucket: "mern-twitter-clone-bfbba.appspot.com",
  messagingSenderId: "974065867537",
  appId: "1:974065867537:web:0d9fca0a969fda755acab0",
  measurementId: "G-X7MNJKDQLE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
