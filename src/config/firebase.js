import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAILuu45_ELpFlmvdJoTFxGLIIh5EgRr04",
  authDomain: "academia-manager-d81df.firebaseapp.com",
  projectId: "academia-manager-d81df",
  storageBucket: "academia-manager-d81df.firebasestorage.app",
  messagingSenderId: "804835092737",
  appId: "1:804835092737:web:fd5aa8268402a7210f9300",
  measurementId: "G-7GDJQGZJ5G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);