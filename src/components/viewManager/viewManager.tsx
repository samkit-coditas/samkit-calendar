import MainContext from "@/context/mainContext";
import React, { useContext } from "react";
import DayView from "../dayView/dayView";
import EventModal from "../eventModal/eventModal";
import Month from "../month/month";
import styles from "./viewManager.module.scss";
const ViewManager = ({ acccessToken }: any) => {
  const { calendarView, daySelected, showEventModal } = useContext(MainContext);
  return (
    <div className={styles.container}>
      {showEventModal && <EventModal />}
      {calendarView === "month" && <Month acccessToken={acccessToken} />}
      {calendarView === "day" && <DayView day={daySelected} />}
    </div>
  );
};
export default ViewManager;
