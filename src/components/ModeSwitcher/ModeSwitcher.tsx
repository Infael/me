import { useMediaQuery, useMouse } from "@uidotdev/usehooks";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import styles from "./ModeSwitcher.module.css";
import { Checkbox } from "../Checkbox/Checkbox";

type Mode = "light" | "dark" | "true-dark";

const FLASHLIGHT_SIZE = 500;

// TODO - should I make color mode persistent? Not now, but maybe later.
export const ModeSwitcher: FC = () => {
  const [mode, setMode] = useState<Mode>("light");

  const userPreferDark = useMediaQuery("(prefers-color-scheme: dark)");

  const mouseDivRef = useRef<HTMLDivElement>(null);
  const [mouseData] = useMouse();

  useEffect(() => {
    if (userPreferDark) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [userPreferDark]);

  useEffect(() => {
    switch (mode) {
      case "light":
        document.documentElement.style.setProperty(
          "--background-color",
          "#f3f3f3"
        );
        document.documentElement.style.setProperty("--color", "#0c0c0c");
        break;
      default:
        document.documentElement.style.setProperty(
          "--background-color",
          "#0c0c0c"
        );
        document.documentElement.style.setProperty("--color", "#f3f3f3");
        break;
    }
  }, [mode]);

  // Cursor movement
  useEffect(() => {
    if (mode === "true-dark") {
      mouseDivRef.current!.style.transform = `translate(${
        mouseData.x - FLASHLIGHT_SIZE / 2
      }px, ${mouseData.y - FLASHLIGHT_SIZE / 2}px)`;
    }
  });

  return (
    <>
      <div className={styles.switcher}>
        <Checkbox
          checked={mode === "light"}
          label="light"
          onChange={() => {
            setMode("light");
          }}
        />
        <Checkbox
          checked={mode === "dark"}
          label="dark"
          onChange={() => {
            setMode("dark");
          }}
        />
        <Checkbox
          checked={mode === "true-dark"}
          label="true dark"
          onChange={() => {
            setMode("true-dark");
          }}
        />
      </div>
      {mode === "true-dark" && (
        <div
          className={styles.cursor}
          ref={mouseDivRef}
          style={
            { "--flashlight-size": `${FLASHLIGHT_SIZE}px` } as CSSProperties
          }
        />
      )}
    </>
  );
};

