import MainContextProvider from "@/context/mainContextProvider";
import { auth } from "@/firebase/firebase";
import dayjs from "dayjs";
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
  const [data, setData] = useState([]);
  const [isDataChecked, setisDataChecked] = useState(true);
  const getData = async () => {
    let authHeader = "Bearer " + acccessToken;

    try {
      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      const events = data.items.map((item: any) => ({
        title: item.summary || "",
        description: item.description || "",
        label: "green",
        day: dayjs(item.start?.dateTime).valueOf(),
        id: dayjs(item.created).valueOf(),
      }));
      setData(events);
      setisDataChecked(true);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (acccessToken) {
      setisDataChecked(false);
      getData();
    }
  }, [acccessToken]);
  return (
    <>
      {user ? (
        <MainContextProvider>
          <div className={styles.main}>
            <TopBar />
            <div className={styles.container}>
              <Sidebar />
              {isDataChecked && <Month data={data} />}
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
