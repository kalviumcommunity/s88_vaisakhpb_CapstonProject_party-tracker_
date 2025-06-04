// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa4qK5ySG0t2Umrza3FhEB_QloWNs3qMU",
  authDomain: "party-tracker-d1d86.firebaseapp.com",
  projectId: "party-tracker-d1d86",
  storageBucket: "party-tracker-d1d86.firebasestorage.app",
  messagingSenderId: "3939019108",
  appId: "1:3939019108:web:3ba25ac427c6602ebd7271",
  measurementId: "G-KWCYTN0H60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics (disabled in development)
if (import.meta.env.PROD) {
  getAnalytics(app);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;