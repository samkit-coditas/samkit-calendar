import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import styles from "./login.module.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const Login = ({ setAccessToken }: any) => {
  // const [signInWithGoogle, userCred, loading, userError] =
  //   useSignInWithGoogle(auth);
  const [error, setError] = useState("");
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar");
  provider.addScope("https://www.googleapis.com/auth/calendar.events");

  const signIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setError("");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        setAccessToken(token);
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <img src="./coditas-comma-white.svg" className={styles.mainLogo} />
      </div>
      <div className={styles.mainContainerData}>
        <img src="./calendar.gif" />
        <div className={styles.title}>Google Calendar</div>
        <div className={styles.login}>
          <button
            className={styles.loginButton}
            onClick={() => {
              signIn();
            }}
          >
            <img src={"./googlelogo.png"} className={styles.googleLogo} />
            SignIn With Google
          </button>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
