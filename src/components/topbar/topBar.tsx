import MainContext from "@/context/mainContext";
import { auth } from "@/firebase/firebase";
import dayjs from "dayjs";
import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./topBar.module.scss";
export default function TopBar() {
  const { monthIndex, setMonthIndex } = useContext(MainContext);

  const [user] = useAuthState(auth);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  const handleScroll = (event: any) => {
    if (event.deltaY < 0) {
      console.log("scrollUp");
      setMonthIndex(monthIndex + 1);
    } else if (event.deltaY > 0) {
      console.log("scrollDown");
      setMonthIndex(monthIndex - 1);
    }
  };
  useEffect(() => {
    if (user) {
      document.addEventListener("wheel", handleScroll);
    }
    return () => document.removeEventListener("wheel", handleScroll);
  }, [user, monthIndex]);

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  const logout = async () => {
    await signOut(auth);
    window.location.reload();
  };

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
        <img className={styles.icon} src="./leftIcon.png" />
      </button>
      <button onClick={handleNextMonth} className={styles.button}>
        <img className={styles.icon} src="./rightIcon.png" />
      </button>
      <h2 className={styles.month}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <button className={styles.logout} onClick={logout}>
        <img src="./logout.png" className={styles.logoutIcon} />
        Logout
      </button>
    </header>
  );
}
