import { FC } from 'react';

import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from './ContactsIcons';
import { classNames } from '@utils';

import styles from './SocialMediaWheel.module.css';

export const SocialMediaWheel: FC = () => {
  return (
    <div className={styles.socialMediaWheelWrapper}>
      <div className={styles.socialMediaWheel}>
        <a
          className={classNames(styles.quadrant, styles.quadrant2)}
          href="https://www.instagram.com/michalmiskostefanak/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          className={classNames(styles.quadrant, styles.quadrant1)}
          href="https://github.com/Infael"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
        <a
          className={classNames(styles.quadrant, styles.quadrant3)}
          href="https://cz.linkedin.com/in/michal-%C5%A1tefa%C5%88%C3%A1k"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        <button className={classNames(styles.quadrant, styles.quadrant4)}>
          <DiscordIcon />
        </button>
      </div>
    </div>
  );
};
