import React from "react";
import styles from "./customSelect.module.scss";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const CustomSelect: React.FC<Props> = ({
  options,
  value,
  disabled,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles["custom-select-container"]}>
      <select
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={styles["custom-select"]}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
