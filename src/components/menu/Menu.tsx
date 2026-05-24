import { FC, useState } from 'react';

import { HamburgerIconButton } from './HamburgerIconButton';
import { Section } from '@components/sections/Sections';
import { classNames } from '@utils';

import styles from './Menu.module.css';

interface MenuProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const Menu: FC<MenuProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={classNames(styles.menu, isMobileMenuOpen && styles.opened)}
      >
        <div
          className={classNames(
            styles.menuItem,
            activeSection === 'aboutMe' ? styles.active : '',
          )}
          onClick={() => setActiveSection('aboutMe')}
        >
          About me
        </div>
        <div
          className={classNames(
            styles.menuItem,
            activeSection === 'contacts' ? styles.active : '',
          )}
          onClick={() => setActiveSection('contacts')}
        >
          Contacts
        </div>
        <div
          className={classNames(
            styles.menuItem,
            activeSection === 'myProjects' ? styles.active : '',
          )}
          onClick={() => setActiveSection('myProjects')}
        >
          My projects
        </div>
        <div
          className={classNames(
            styles.menuItem,
            activeSection === 'mySkills' ? styles.active : '',
          )}
          onClick={() => setActiveSection('mySkills')}
        >
          My Skills
        </div>
        <div
          className={classNames(
            styles.menuItem,
            activeSection === 'aboutBackground' ? styles.active : '',
          )}
          onClick={() => setActiveSection('aboutBackground')}
        >
          This background
        </div>
      </nav>
      <HamburgerIconButton
        className={styles.mobileMenuButton}
        opened={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      />
    </>
  );
};
