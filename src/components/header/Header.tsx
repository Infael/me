import { FC, ReactNode } from 'react';

import styles from './Header.module.css';

interface HeaderProps {
  children: ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <h2 className={styles.heading}>
      <span className={styles.srOnly}>{children}</span>

      <svg
        className={styles.svg}
        viewBox="0 0 480 90"
        aria-hidden="true"
        focusable="false"
      >
        <text className={styles.svgText} x="10" y="60">
          {children}
        </text>
      </svg>
    </h2>
  );
};
