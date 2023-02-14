import MainContextProvider from "@/context/mainContextProvider";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../login/login";
import Month from "../month/month";
import Sidebar from "../sideBar/sideBar";
import TopBar from "../topbar/topBar";
import styles from "./mainPage.module.scss";
const MainPage = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <MainContextProvider>
          <div className={styles.main}>
            <TopBar />
            <div className={styles.container}>
              <Sidebar />
              <Month />
            </div>
          </div>
        </MainContextProvider>
      ) : (
        <Login />
      )}
    </>
  );
};
export default MainPage;
