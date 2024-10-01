import { FC } from "react";
import { Header } from "../Header/Header";
import styles from "./section.module.css";

export const AboutMe: FC = () => {
  return (
    <section className={styles.main}>
      <Header>Hello! I'm Michal</Header>
      <p className={styles.mainText}>
        I think life is meaningful when I create. And that's why I became a full
        stack developer. I started programming in high school, creating simple
        programs and games in python. I've always had an eye for the smallest
        details, so I embarked on a career as a front end developer while in
        college. In doing so, I often handled back end and dev ops as well, so
        experience there is definitely not lacking.
      </p>
      <p className={styles.mainText}>
        In my spare time I like to code (how surprising 😄) but outside of that
        I like to paint, play board games and workout.
      </p>
    </section>
  );
};

