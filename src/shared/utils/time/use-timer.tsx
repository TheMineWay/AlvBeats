import { useEffect, useRef, useState } from "react";

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
  const startTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(initialTime);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsed = Date.now() - startTimeRef.current + offsetRef.current;
        setTime(Math.min(elapsed, maxTime));
        if (elapsed >= maxTime) {
          setIsRunning(false);
        }
      }
    }, INTERVAL);

    return () => {
      clearInterval(interval);
      if (startTimeRef.current !== null) {
        offsetRef.current += Date.now() - startTimeRef.current;
        startTimeRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, maxTime]);

  const pause = () => {
    setIsRunning(false);
  };
  const play = () => {
    if (time >= maxTime) stop();
    else setIsRunning(true);
  };
  const stop = () => {
    setIsRunning(false);
    setTime(0);
    offsetRef.current = 0;
    startTimeRef.current = null;
  };

  return {
    time,
    setTime: (t: number) => {
      setTime(t);
      offsetRef.current = t;
      if (isRunning) {
        startTimeRef.current = Date.now();
      }
    },
    isRunning,
    pause,
    play,
    stop,
  };
};

export type UseTimer = ReturnType<typeof useTimer>;
