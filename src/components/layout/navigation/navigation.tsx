import { DarkModeSwitch } from "@components/layout/navigation/actions/dark-mode-switch";
import { ThemeSelector } from "@components/layout/navigation/actions/theme-selector";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { useTranslation } from "@i18n/use-translation";

export const Navigation: FC = () => {
  const { t: commonT } = useTranslation("common");
  const { t } = useTranslation("layout");

  return (
    <div className="h-full flex items-center justify-between p-2 bg-background/70 backdrop-blur-md">
      <div>
        <div className="relative inline-block">
          <Button variant="outline" disabled>
            {t().navigation.actions["song-editor"].Title}
          </Button>
          <Badge className="absolute -top-2 -right-2">
            {commonT().sentences["Coming-soon"]}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <ThemeSelector />
      </div>
    </div>
  );
};
