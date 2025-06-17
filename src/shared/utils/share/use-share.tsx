import { useCallback, useMemo } from "react";

type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

export const useShare = () => {
  const isShareSupported = useMemo(
    () =>
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    []
  );

  const share = useCallback(
    async (data: ShareData) => {
      if (!isShareSupported) return;

      try {
        await navigator.share(data);
      } catch (err) {
        console.warn("Error sharing content:", err);
      }
    },
    [isShareSupported]
  );

  return { isShareSupported, share };
};
