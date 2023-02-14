import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC5fXdWbPEGrbhcomTgCNc6NGu85nyNr6M",
  authDomain: "samkit-s-calendar.firebaseapp.com",
  projectId: "samkit-s-calendar",
  storageBucket: "samkit-s-calendar.appspot.com",
  messagingSenderId: "571967029503",
  appId: "1:571967029503:web:b1d905f286136d91408cca",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export { app, auth };
