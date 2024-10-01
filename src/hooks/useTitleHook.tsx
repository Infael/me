import { useEffect, useRef } from "react";

export const useTitleHook = () => {
  const TITLE = "___MICHAL_ŠTEFAŇÁK___DEVELOPER___WANNA_BE_ARTIST___HUSBAND";
  const TITLE_LENGTH = 21;

  const titleIndex = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let title = TITLE.slice(
        titleIndex.current,
        titleIndex.current + TITLE_LENGTH
      );
      if (titleIndex.current + TITLE_LENGTH > TITLE.length) {
        title = title + TITLE.slice(0, titleIndex.current);
      }
      document.title = `🔥 ${title}`;
      titleIndex.current = (titleIndex.current + 1) % TITLE.length;
    }, 400);
    return () => clearInterval(timer);
  }, [TITLE_LENGTH]);
};

