import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { useTranslation } from "@i18n/use-translation";

export const WakeLockError = () => {
  const { t } = useTranslation("song-player");

  return (
    <Alert variant="destructive">
      <AlertTitle>{t().alerts["wake-lock-error"].Title}</AlertTitle>
      <AlertDescription>
        {t().alerts["wake-lock-error"].Description}
      </AlertDescription>
    </Alert>
  );
};
