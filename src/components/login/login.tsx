import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import styles from "./login.module.scss";
const Login = () => {
  const [signInWithGoogle, userCred, loading, userError] =
    useSignInWithGoogle(auth);
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
              signInWithGoogle();
            }}
          >
            <img src={"./googlelogo.png"} className={styles.googleLogo} />
            SignIn With Google
          </button>
          <p className={styles.errorMessage}>{userError?.message}</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
