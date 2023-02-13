import MainContext from "@/context/mainContext";
import React, { useContext } from "react";
import styles from "./createEventButton.module.scss";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(MainContext);
  return (
    <button onClick={() => setShowEventModal(true)} className={styles.button}>
      <img src={"./plus.svg"} alt="create_event" className={styles.logo} />
      <span className={styles.text}> Create</span>
    </button>
  );
}
