import { FC } from 'react';

import { Header } from '../../Header/Header';
import { GeoIcon, MailIcon, PhoneIcon } from './components/ContactsIcons';
import { SocialMediaWheel } from './components/SocialMediaWheel';

import styles from '../section.module.css';
import contactStyles from './Contacts.module.css';

export const Contacts: FC = () => {
  return (
    <section className={styles.main}>
      <div className={contactStyles.sectionWrapper}>
        <div>
          <Header>Contact me</Header>
          <div className={contactStyles.contactsWrapper}>
            <div className={contactStyles.contactsRow}>
              <GeoIcon />
              <span>Prague, Czech Republic</span>
            </div>
            <div className={contactStyles.contactsRow}>
              <PhoneIcon />
              <a href="tel:+420724699452">+420 724 699 452</a>
            </div>
            <div className={contactStyles.contactsRow}>
              <MailIcon />
              <a href="mailto:michalstefanak22@gmail.com">
                michalstefanak22@gmail.com
              </a>
            </div>
          </div>
        </div>
        <SocialMediaWheel />
      </div>
    </section>
  );
};
