import { FC } from "react";
import { Section } from "../Layout/MainLayout";
import styles from "./Menu.module.css";
import classNames from "classnames";

interface MenuProps {
  activeSection: string;
  setActiveSection: (section: Section) => void;
}

export const Menu: FC<MenuProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className={styles.menu}>
      <div
        className={classNames(
          styles.menuItem,
          activeSection === "aboutMe" ? styles.active : ""
        )}
        onClick={() => setActiveSection("aboutMe")}
      >
        About me
      </div>
      <div
        className={classNames(
          styles.menuItem,
          activeSection === "contacts" ? styles.active : ""
        )}
        onClick={() => setActiveSection("contacts")}
      >
        Contacts
      </div>
      <div
        className={classNames(
          styles.menuItem,
          activeSection === "myProjects" ? styles.active : ""
        )}
        onClick={() => setActiveSection("myProjects")}
      >
        My projects
      </div>
      <div
        className={classNames(
          styles.menuItem,
          activeSection === "aboutBackground" ? styles.active : ""
        )}
        onClick={() => setActiveSection("aboutBackground")}
      >
        About this background
      </div>
    </nav>
  );
};

