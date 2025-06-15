import { useEffect, useState } from "react";

type Options = {
  disabled?: boolean;
};

export const useWakeLock = ({ disabled = false }: Options = {}) => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>();

  const isWakeLockSupported = "wakeLock" in navigator;

  const request = () => {
    if (disabled) return;

    if (isWakeLockSupported) {
      return navigator.wakeLock.request("screen");
    }
  };

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        const lock = await request();
        setWakeLock(lock ?? null);
      } catch (error) {
        console.error("Failed to acquire wake lock:", error);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release().catch((error: Error) => {
          console.error("Failed to release wake lock:", error);
        });
      }
    };
  }, [wakeLock, disabled, isWakeLockSupported]);

  return {
    wakeLock,
    isActive: !!wakeLock,
    request,
    isWakeLockSupported,
  };
};
