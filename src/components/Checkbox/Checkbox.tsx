import { FC } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className={styles.label}>
      {label.toUpperCase()}
      <input
        className={styles.input}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <span className={styles.checkmark} />
    </label>
  );
};

