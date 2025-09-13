// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoS514k6kjaYXmGl7_odTeYfDRx0ImoDA",
  authDomain: "moonchill-213a5.firebaseapp.com",
  projectId: "moonchill-213a5",
  storageBucket: "moonchill-213a5.firebasestorage.app",
  messagingSenderId: "950344886595",
  appId: "1:950344886595:web:5c51430538465d914e67f6",
  measurementId: "G-0249DQ4ZVN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};
