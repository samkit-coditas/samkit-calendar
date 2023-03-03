import MainContext from "@/context/mainContext";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import styles from "./dayView.module.scss";

const DayView = ({ day }: any) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(MainContext);

  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: any) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  useEffect(() => {
    setTopPosition(0);
    if (isToday) {
      fetchTopPosition();
      let intervalId = setInterval(() => {
        fetchTopPosition();
        return () => {
          clearInterval(intervalId);
        };
      }, 60000);
    }
  }, [day]);
  console.log(topPosition);
  const fetchTopPosition = () => {
    setTopPosition(calculateTopPosition(new Date()));
  };
  const timeSlots = [];
  for (let i = 1; i <= 24; i++) {
    timeSlots.push(
      <div className={styles["time-slots"]} key={i}>
        <div key={i} className={styles["time-slot"]}>
          <span className={styles.time}>{`${
            i !== 12 && i !== 24 ? i % 12 : 12
          } ${i > 11 ? "PM" : "AM"}`}</span>
        </div>
        <div
          onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
          }}
          className={styles["hourlyEvents"]}
        >
          {dayEvents.map((evt: any, idx: number) => (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={styles[`${evt.label}-label`]}
            >
              {evt.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.bottomTextContainer}>
          <span className={styles.bottomText}>GMT+5:30</span>
        </div>

        <div
          className={styles.header}
          onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
          }}
        >
          <span className={isToday ? styles.day : styles.normalDay}>
            {day.format("ddd").toUpperCase()}
          </span>
          <p className={isToday ? styles.date : styles.normalDate}>
            {day.date()}
          </p>
        </div>
      </div>
      <div className={styles["day-view"]}>
        {!!topPosition && (
          <div
            className={styles["time-indicator-line"]}
            style={{ top: topPosition - 3 }}
          >
            <div className={styles["line"]} />
            <div className={styles["circle"]} />
          </div>
        )}
        {timeSlots}
      </div>
    </div>
  );
};
function calculateTopPosition(currentTime: Date): number {
  const startOfDay = new Date(currentTime);
  startOfDay.setHours(0, 0, 0, 0);
  const secondsSinceStartOfDay =
    (currentTime.getTime() - startOfDay.getTime()) / 1000;
  const minutesSinceStartOfDay = secondsSinceStartOfDay / 60;
  return Math.floor(minutesSinceStartOfDay);
}

export default DayView;
