import { FC } from 'react';

import { classNames } from '@utils';

import styles from './HamburgerIconButton.module.css';

interface HamburgerIconButtonProps {
  opened: boolean;
  onClick: () => void;
  className?: string;
}

export const HamburgerIconButton: FC<HamburgerIconButtonProps> = ({
  opened,
  onClick,
  className,
}) => {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      <span
        className={classNames(styles.bar, styles.bar1, opened && styles.opened)}
      />
      <span
        className={classNames(styles.bar, styles.bar2, opened && styles.opened)}
      />
      <span
        className={classNames(styles.bar, styles.bar3, opened && styles.opened)}
      />
    </button>
  );
};
