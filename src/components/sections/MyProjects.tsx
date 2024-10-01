import { FC } from "react";
import { Header } from "../Header/Header";
import styles from "./section.module.css";

export const MyProjects: FC = () => {
  return (
    <section className={styles.main}>
      <Header>What have I done?</Header>
      <p className={styles.mainText}>TBD</p>
    </section>
  );
};

