import { useEffect, useState } from "react";

const INTERVAL = 100;

type Options = {
  initialTime?: number;
  autoPlay?: boolean;
  maxTime?: number;
};

export const useTimer = ({
  initialTime = 0,
  autoPlay = false,
  maxTime = Infinity,
}: Options = {}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoPlay);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + INTERVAL);
    }, INTERVAL);

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

  // Autostop
  if (time >= maxTime) {
    stop();
  }

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

export type UseTimer = ReturnType<typeof useTimer>;
