import MainContextProvider from "@/context/mainContextProvider";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../login/login";
import Month from "../month/month";
import Sidebar from "../sideBar/sideBar";
import TopBar from "../topbar/topBar";
import styles from "./mainPage.module.scss";
const MainPage = () => {
  const [user] = useAuthState(auth);
  const [acccessToken, setAccessToken] = useState<any>("");
  useEffect(() => {
    auth.signOut();
  }, []);
  return (
    <>
      {user ? (
        <MainContextProvider>
          <div className={styles.main}>
            <TopBar />
            <div className={styles.container}>
              <Sidebar />
              {acccessToken && <Month acccessToken={acccessToken} />}
            </div>
          </div>
        </MainContextProvider>
      ) : (
        <Login setAccessToken={setAccessToken} />
      )}
    </>
  );
};
export default MainPage;
