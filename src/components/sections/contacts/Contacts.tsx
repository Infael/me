import { FC } from 'react';

import { Header } from '../../header/Header';
import {
  GeoIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from './components/ContactsIcons';
import { SocialMediaIcon } from './components/socialMediaIcon/SocialMediaIcon';

import moxfieldLogo from './components/moxfieldLogo.png';

import styles from './Contacts.module.css';

export const Contacts: FC = () => {
  return (
    <>
      <Header>Contact me</Header>
      <div className={styles.contactsWrapper}>
        <div className={styles.contactsRow}>
          <GeoIcon />
          <span>Prague, Czech Republic</span>
        </div>
        <div className={styles.contactsRow}>
          <PhoneIcon />
          <a href="tel:+420724699452">+420 724 699 452</a>
        </div>
        <div className={styles.contactsRow}>
          <MailIcon />
          <a href="mailto:michalstefanak22@gmail.com">
            michalstefanak22@gmail.com
          </a>
        </div>
        <div className={styles.socialMediaRow}>
          <p>Find me also on</p>
          <div className={styles.contactsRow}>
            <SocialMediaIcon
              href="https://github.com/Infael"
              label="My code"
              icon={<GitHubIcon />}
            />
            <SocialMediaIcon
              href="https://cz.linkedin.com/in/michal-%C5%A1tefa%C5%88%C3%A1k"
              label="Work stuff"
              icon={<LinkedInIcon />}
            />
            <SocialMediaIcon
              href="https://www.instagram.com/michalmiskostefanak/"
              label={
                <div className={styles.instagramLabelBox}>
                  <p>My life</p>
                  <p>in a few snapshots</p>
                </div>
              }
              icon={<InstagramIcon />}
            />
            <SocialMediaIcon
              href="https://moxfield.com/users/Infael"
              label="Cards?"
              icon={<img src={moxfieldLogo} alt="Moxfield" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};
