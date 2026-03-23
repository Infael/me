import { FC } from 'react';

import { Header } from '../../header/Header';
import { GeoIcon, MailIcon, PhoneIcon } from './components/ContactsIcons';
import { SocialMediaWheel } from './components/socialMediaWheel/SocialMediaWheel';

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
        <SocialMediaWheel />
      </div>
    </>
  );
};
