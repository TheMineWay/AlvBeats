import { useInstall } from "@components/layout/actions/use-install";
import { Button } from "@components/ui/button";
import { useTranslation } from "@i18n/use-translation";
import { Download } from "lucide-react";

export const InstallButton: FC = () => {
  const { t } = useTranslation("layout");
  const { isInstallable, promptInstall } = useInstall();

  return (
    <Button disabled={!isInstallable} variant="outline" onClick={promptInstall}>
      <Download />
      {t().navigation.actions.install.Title}
    </Button>
  );
};
