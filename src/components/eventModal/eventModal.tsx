import MainContext from "@/context/mainContext";
import React, { useContext, useState } from "react";
import styles from "./eventModal.module.scss";
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(MainContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e: any) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className={styles.eventModal}>
      <form className={styles.form}>
        <header className={styles.header}>
          <span className={styles.dragIcon}>
            <img src="./drag.png" />
          </span>
          <div className={styles.iconContainer}>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className={styles.delIcon}
              >
                <img src="./delete.png" />
              </span>
            )}
            <button
              className={styles.closeIcon}
              onClick={() => setShowEventModal(false)}
            >
              <img src="./close.png" />
            </button>
          </div>
        </header>
        <div className={styles.inputContainer}>
          <div className={styles.gridContainer}>
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className={styles.titleInput}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>
              <img src="./schedule.png" />
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span>
              <img src="./segment.png" />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className={styles.descriptionInput}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span>
              <img src="./bookmark.png" />
            </span>
            <div className={styles.bookmarkColors}>
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={styles[`${lblClass}-color`]}
                >
                  {selectedLabel === lblClass && (
                    <span className={styles.rightText}>✔</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.saveButton}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
