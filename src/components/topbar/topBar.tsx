import MainContext from "@/context/mainContext";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import styles from "./topBar.module.scss";
export default function TopBar() {
  const { monthIndex, setMonthIndex } = useContext(MainContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className={styles.topBar}>
      <div>
        <img src={"./logo.png"} alt="calendar" className={styles.logo} />
        <span className={styles.date}>
          {new Date().toLocaleDateString().split("/")[1]}
        </span>
      </div>
      <h1 className={styles.heading}>Calendar</h1>
      <button onClick={handleReset} className={styles.resetButton}>
        Today
      </button>
      <button onClick={handlePrevMonth} className={styles.button}>
        <span className={styles.icon}>{"<"}</span>
      </button>
      <button onClick={handleNextMonth} className={styles.button}>
        <span className={styles.icon}>{">"}</span>
      </button>
      <h2 className={styles.month}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
