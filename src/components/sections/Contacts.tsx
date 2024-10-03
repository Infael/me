import { FC } from "react";
import { Header } from "../Header/Header";
import styles from "./section.module.css";

export const Contacts: FC = () => {
  return (
    <section className={styles.main}>
      <Header>Contact me</Header>
      <p className={styles.mainText}>TBD...</p>
    </section>
  );
};

