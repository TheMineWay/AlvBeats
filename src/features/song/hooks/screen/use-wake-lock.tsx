import { useEffect, useState } from "react";

export const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const request = () => {
    if ("wakeLock" in navigator) {
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
  }, [wakeLock]);

  return { wakeLock, isActive: !!wakeLock, request };
};
