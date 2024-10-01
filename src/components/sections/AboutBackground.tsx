import { FC } from "react";
import { Header } from "../Header/Header";
import styles from "./section.module.css";

export const AboutBackground: FC = () => {
  return (
    <section className={styles.main}>
      <Header>Game of Life</Header>
      <p className={styles.mainText}>
        What you see in the background of this screen is Conway's Game of Life.
        It's a mathematical model of a cellular automaton that simulates the
        evolution of a cell population based on simple deterministic rules...
        wow words.
      </p>
      <p className={styles.mainText}>
        Basically it's a zero-player game, so once you set it up, you just sit
        back and watch cells live, die, and occasionally throw a party. Each
        little cell follows some basic rules: too many neighbors, and it's
        overcrowded (it dies); too few, and it's lonely (also dies). But with
        just the right crowd, they thrive!
      </p>
      <p className={styles.mainText}>
        You can hide the screen text at the top of the screen so you can see the
        whole show.
      </p>
    </section>
  );
};

