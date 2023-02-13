import MainContextProvider from "@/context/mainContextProvider";
import Month from "../month/month";
import Sidebar from "../sideBar/sideBar";
import TopBar from "../topbar/topBar";
import styles from "./mainPage.module.scss";
const MainPage = () => {
  return (
    <MainContextProvider>
      <div className={styles.main}>
        <TopBar />
        <div className={styles.container}>
          <Sidebar />
          <Month />
        </div>
      </div>
    </MainContextProvider>
  );
};
export default MainPage;
