import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoS514k6kjaYXmGl7_odTeYfDRx0ImoDA",
  authDomain: "moonchill-213a5.firebaseapp.com",
  projectId: "moonchill-213a5",
  storageBucket: "moonchill-213a5.appspot.com",
  messagingSenderId: "950344886595",
  appId: "1:950344886595:web:5c51430538465d914e67f6",
};

// Prevent initializing multiple apps in development (especially Next.js hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and export
const auth = getAuth(app);

export { app, auth };
