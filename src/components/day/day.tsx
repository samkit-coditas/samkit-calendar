import MainContext from "@/context/mainContext";
import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import styles from "./day.module.scss";
export default function Day({ day, rowIdx, month }: any) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(MainContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: any) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? styles.currentDate
      : styles.date;
  }
  const onWheelHandler = (event: any) => {
    if (dayEvents.length > 2) {
      event.stopPropagation();
    }
  };
  return (
    <div className={styles.day}>
      <header className={styles.heading}>
        {rowIdx === 0 && (
          <p className={styles.dayText}>{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={getCurrentDayClass()}>
          <span
            className={
              month[1][0].format("MM") == day.format("MM") ? "" : styles.light
            }
          >
            {day.format("DD")}
          </span>
        </p>
      </header>
      <div
        className={styles.eventContainer}
        style={rowIdx === 0 ? { maxHeight: "60px" } : undefined}
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
        onWheel={onWheelHandler}
      >
        {dayEvents.map((evt: any, idx: number) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={styles[`${evt.label}-label`]}
            onWheel={onWheelHandler}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
