import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVaOnZCrib2_UZmIkoEtud9n2fvHJYHkQ",
  authDomain: "didero-sri.firebaseapp.com",
  projectId: "didero-sri",
  storageBucket: "didero-sri.appspot.com",
  messagingSenderId: "150309225904",
  appId: "1:150309225904:web:bc2a9cae1b95689e4e0275",
  measurementId: "G-NC53Z8XSWC",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
