import React from "react";
import CreateEventButton from "../createEventButton/createEventButton";
import Labels from "../labels/labels";
import SmallCalendar from "../smallCalendar/smallCalendar";
import styles from "./sideBar.module.scss";
export default function Sidebar() {
  return (
    <aside className={styles.sideBar}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
