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

  async function handleSubmit(e: any) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      meetLink: selectedEvent ? selectedEvent.meetLink : "",
      _id: selectedEvent ? selectedEvent._id : "",
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
      if (selectedEvent._id) {
        try {
          let authHeader = "Bearer " + localStorage.getItem("accessToken");
          let url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${selectedEvent._id}`;
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: authHeader,
            },
          });
          const data = await res.json();
          data.summary = title;
          data.description = description;
          const event = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: authHeader,
            },
            body: JSON.stringify(data),
          });
          const result = await event.json();
        } catch (error) {
          console.log("error", error);
          setShowEventModal(false);
        }
      }
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className={styles.eventModal} onClick={() => setShowEventModal(false)}>
      <form
        className={styles.form}
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      >
        <header className={styles.header}>
          <div></div>
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
              >
                <img src="./delete.png" className={styles.delIcon} />
              </span>
            )}
            <button
              className={styles.closeIcon}
              onClick={() => setShowEventModal(false)}
            >
              <span>x</span>
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
            <img src="./schedule.png" className={styles.scheduleIcon} />
            <p className={styles.date}>{daySelected.format("dddd, MMMM DD")}</p>
            <img src="./segment.png" className={styles.segmentIcon} />
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className={styles.descriptionInput}
              onChange={(e) => setDescription(e.target.value)}
            />
            <img src="./bookmark.png" className={styles.bookmarkIcon} />
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
          {selectedEvent?.meetLink ? (
            <div>
              <a href={selectedEvent.meetLink} target="_blank">
                <button className={styles.meetButton} type="button">
                  Join with Google Meet
                </button>
              </a>
              <span className={styles.link}>{selectedEvent.meetLink}</span>
            </div>
          ) : (
            <div></div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.saveButton}
            disabled={!title}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
