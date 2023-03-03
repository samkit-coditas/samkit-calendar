import MainContext from "@/context/mainContext";
import { auth } from "@/firebase/firebase";
import dayjs from "dayjs";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import CustomSelect from "../customSelect/customSelect";
import styles from "./topBar.module.scss";
export default function TopBar() {
  const {
    monthIndex,
    setMonthIndex,
    calendarView,
    setCalendarView,
    daySelected,
    setDaySelected,
  } = useContext(MainContext);

  function handlePrevMonth() {
    calendarView === "month" && setMonthIndex(monthIndex - 1);
    calendarView === "day" &&
      setDaySelected(dayjs(daySelected).subtract(1, "day"));
  }
  function handleNextMonth() {
    calendarView === "month" && setMonthIndex(monthIndex + 1);
    calendarView === "day" && setDaySelected(dayjs(daySelected).add(1, "day"));
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    calendarView === "day" && setDaySelected(dayjs(Date.now()));
  }
  const logout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <header className={styles.topBar}>
      <div>
        <img src={"./logo.png"} alt="calendar" className={styles.logo} />
        <span
          className={
            new Date().toLocaleDateString().split("/")[1].length == 2
              ? styles.date
              : styles.singleDate
          }
        >
          {new Date().toLocaleDateString().split("/")[1]}
        </span>
      </div>
      <h1 className={styles.heading}>Calendar</h1>
      <button onClick={handleReset} className={styles.resetButton}>
        Today
      </button>
      <button onClick={handlePrevMonth} className={styles.button}>
        <img className={styles.icon} src="./leftIcon.png" />
      </button>
      <button onClick={handleNextMonth} className={styles.button}>
        <img className={styles.icon} src="./rightIcon.png" />
      </button>
      <h2 className={styles.month}>
        {calendarView === "month" &&
          dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        {calendarView === "day" && dayjs(daySelected).format("MMMM DD YYYY")}
      </h2>
      <div className={styles.select}>
        <CustomSelect
          options={[
            { label: "Day", value: "day" },
            { label: "Week", value: "week" },
            { label: "Month", value: "month" },
            { label: "Year", value: "year" },
          ]}
          value={calendarView}
          onChange={(value: string) => {
            setCalendarView(value);
          }}
        />
      </div>
      <button className={styles.logout} onClick={logout}>
        <img src="./logout.png" className={styles.logoutIcon} />
        Logout
      </button>
    </header>
  );
}
