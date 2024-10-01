import { FC, ReactNode } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  children: ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <svg className={styles.svg} viewBox="0 0 480 90">
      <text className={styles.svgText} x="10" y="60">
        {children}
      </text>
    </svg>
  );
};

