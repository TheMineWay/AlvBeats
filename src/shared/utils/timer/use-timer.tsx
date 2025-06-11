import { useEffect, useState } from "react";

type Options = {
  initialTime?: number;
  autoPlay?: boolean;
};

export const useTimer = ({
  initialTime = 0,
  autoPlay = false,
}: Options = {}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoPlay);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const pause = () => {
    setIsRunning(false);
  };
  const play = () => {
    setIsRunning(true);
  };
  const stop = () => {
    setIsRunning(false);
    setTime(0);
  };

  return {
    time,
    setTime,
    isRunning,

    // Actions
    pause,
    play,
    stop,
  };
};
