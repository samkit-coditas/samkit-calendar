import MainContext from "@/context/mainContext";
import { getMonth } from "@/utility/helper";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import styles from "./smallCalendar.module.scss";
export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth(currentMonthIdx));
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(MainContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrev() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNext() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day: any) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return styles.selectedDay;
    } else if (currDay === slcDay) {
      return styles.currentSelectedDay;
    } else {
      return styles.normalDay;
    }
  }

  return (
    <div className={styles.smallCalendar}>
      <header className={styles.header}>
        <p className={styles.monthHeading}>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={handlePrev} className={styles.button}>
            <img className={styles.icon} src="./leftIcon.png" />
          </button>
          <button onClick={handleNext} className={styles.button}>
            <img className={styles.icon} src="./rightIcon.png" />
          </button>
        </div>
      </header>
      <div className={styles.dayGrid}>
        {currentMonth[0].map((day, i) => (
          <span key={i} className={styles.dayText}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={getDayClass(day)}
              >
                <span
                  className={
                    currentMonth[1][0].format("MM") == day.format("MM")
                      ? styles.text
                      : styles.noText
                  }
                >
                  {day.format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
