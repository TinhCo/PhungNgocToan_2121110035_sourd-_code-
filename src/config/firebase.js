import { initializeApp, getApps } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArYjNLCPBDJp4ouMmdd63ul_fKj8tdtnM",
  authDomain: "client-19006.firebaseapp.com",
  projectId: "client-19006",
  storageBucket: "client-19006.appspot.com",
  messagingSenderId: "718440937096",
  appId: "1:718440937096:web:16a062e96fa09063d7513d",
  measurementId: "G-XMCM6J65VH",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const provider = new FacebookAuthProvider();

export { auth, provider };
