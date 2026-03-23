import { Activity, FC, ReactNode } from 'react';

import { AboutBackground } from './aboutBackground/AboutBackground';
import { AboutMe } from './aboutMe/AboutMe';
import { Contacts } from './contacts/Contacts';
import { MyProjects } from './myProjects/MyProjects';

import styles from './Sections.module.css';

export type Section = 'aboutMe' | 'myProjects' | 'aboutBackground' | 'contacts';
interface SectionProps {
  activeSection: Section;
}

export const Sections: FC<SectionProps> = ({ activeSection }) => {
  const isActiveSection = (section: Section) => {
    return activeSection === section ? 'visible' : 'hidden';
  };

  const sections: { name: Section; component: ReactNode }[] = [
    { name: 'aboutMe', component: <AboutMe /> },
    { name: 'contacts', component: <Contacts /> },
    { name: 'myProjects', component: <MyProjects /> },
    { name: 'aboutBackground', component: <AboutBackground /> },
  ];

  return (
    <>
      {sections.map(({ name, component }) => (
        <Activity key={name} mode={isActiveSection(name)}>
          <section className={styles.main}>{component}</section>
        </Activity>
      ))}
    </>
  );
};
