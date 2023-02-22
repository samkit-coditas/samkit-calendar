import MainContext from "@/context/mainContext";
import { getMonth } from "@/utility/helper";
import React, { useContext, useEffect, useState } from "react";
import Day from "../day/day";
import dayjs from "dayjs";
import EventModal from "../eventModal/eventModal";
import styles from "./month.module.scss";
export default function Month({ acccessToken }: any) {
  const [month, setCurrentMonth] = useState(getMonth());

  const [data, setData] = useState([]);

  const { monthIndex, showEventModal, dispatchCalEvent } =
    useContext(MainContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  useEffect(() => {
    data.length && dispatchCalEvent({ type: "pushArray", payload: data });
  }, [data]);
  const getData = async () => {
    let authHeader = "Bearer " + acccessToken;
    let url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      });
      const data = await res.json();
      console.log(data);
      const events = data.items.map((item: any) => ({
        title: item.summary || "",
        description: item.description || "",
        label: "green",
        day: dayjs(item.start?.dateTime).valueOf(),
        id: dayjs(item.created).valueOf(),
        _id: item.id,
        meetLink: item.hangoutLink || "",
      }));
      setData(events);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (acccessToken) {
      localStorage.setItem("accessToken", acccessToken);

      getData();
    }
  }, [acccessToken]);
  useEffect(() => {
    if (data.length) {
      setTimeout(() => {
        getData();
      }, 3000);
    }
  }, [data]);
  return (
    <>
      {!!data.length && (
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
      )}
    </>
  );
}
