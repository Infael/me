import { FC } from 'react';

import styles from './SocialMediaIcon.module.css';

interface SocialMediaIconProps {
  href: string;
  label: React.ReactNode;
  icon: React.ReactNode;
}

export const SocialMediaIcon: FC<SocialMediaIconProps> = ({
  href,
  label,
  icon,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.iconWrapper}
    >
      {icon}
      <span className={styles.iconLabel}>{label}</span>

      <div className={styles.hoverEffect}>
        {icon}
        <span className={styles.iconLabel}>{label}</span>
      </div>
    </a>
  );
};
