
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlmX05QAgQEobhLxssRuL0o1h41RlFntg",
  authDomain: "portfolio-firebase-ffee1.firebaseapp.com",
  projectId: "portfolio-firebase-ffee1",
  storageBucket: "portfolio-firebase-ffee1.firebasestorage.app",
  messagingSenderId: "781915324245",
  appId: "1:781915324245:web:2d52c24172ec8c3272b9dc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
