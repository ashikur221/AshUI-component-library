// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmoC0x1OZ7I04FHoA2GsPiGNnG5E6C_g8",
  authDomain: "ashui-58baf.firebaseapp.com",
  projectId: "ashui-58baf",
  storageBucket: "ashui-58baf.firebasestorage.app",
  messagingSenderId: "100002512678",
  appId: "1:100002512678:web:839a7efa873a456692cbe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;