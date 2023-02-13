import MainContext from "@/context/mainContext";
import { getMonth } from "@/utility/helper";
import React, { useContext, useEffect, useState } from "react";
import Day from "../day/day";
import EventModal from "../eventModal/eventModal";
import styles from "./month.module.scss";
export default function Month() {
  const [month, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(MainContext);
  useEffect(() => {
    console.log(monthIndex);
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className={styles.month}>
      {showEventModal && <EventModal />}
      {month.map((row: any, i: number) => (
        <React.Fragment key={i}>
          {row.map((day: any, idx: number) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
