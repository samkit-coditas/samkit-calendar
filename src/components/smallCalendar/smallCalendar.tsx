import MainContext from "@/context/mainContext";
import { getMonth } from "@/utility/helper";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import styles from "./smallCalendar.module.scss";
export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(
    getMonth(currentMonthIdx, "from small Calendar")
  );
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(MainContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
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
        <div>
          <button onClick={handlePrevMonth} className={styles.button}>
            <span className={styles.icon}>{"<"}</span>
          </button>
          <button onClick={handleNextMonth} className={styles.button}>
            <span className={styles.icon}>{">"}</span>
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
                <span className={styles.text}>{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
