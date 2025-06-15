import { useEffect, useState } from "react";

export const useScreen = () => {
  const [screen, setScreen] = useState<Screen>(window.screen);

  useEffect(() => {
    const fn = () => setScreen(window.screen);

    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);

  return screen;
};
