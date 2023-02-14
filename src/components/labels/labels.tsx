import MainContext from "@/context/mainContext";
import React, { useContext } from "react";
import styles from "./labels.module.scss";
export default function Labels() {
  const { labels, updateLabel } = useContext(MainContext);
  return (
    <div className={styles.labels}>
      <p className={styles.heading}>Label</p>
      {labels.map(({ label: lbl, checked }: any, idx: number) => (
        <label key={idx} className={styles.labelContainer}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={styles.checkbox}
          />
          <span className={styles.labelText}>
            {lbl}{" "}
            {/* <span className={checked ? styles[`${lbl}-color`] : styles.colors}> */}
            <span className={styles[`${lbl}-color`]}>{checked ? "✔" : ""}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
