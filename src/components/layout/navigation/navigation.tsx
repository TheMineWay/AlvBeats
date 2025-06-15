import { DarkModeSwitch } from "@components/layout/navigation/actions/dark-mode-switch";
import { ThemeSelector } from "@components/layout/navigation/actions/theme-selector";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import { SettingsDialog } from "@features/settings/settings-dialog";
import { useTranslation } from "@i18n/use-translation";
import { Link } from "@tanstack/react-router";
import { Edit, Home, Menu, Settings } from "lucide-react";
import { useState } from "react";

export const Navigation: FC = () => {
  return (
    <div className="h-full flex items-center justify-between p-2 bg-background/70 backdrop-blur-md">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Menu />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <MenuContent />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <Link to="/">
            <Home />
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <ThemeSelector />
      </div>
    </div>
  );
};

const MenuContent: FC = () => {
  const { t: commonT } = useTranslation("common");
  const { t } = useTranslation("layout");

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 p-1">
        <div className="relative inline-block">
          <Button variant="outline" disabled>
            <Edit /> {t().navigation.actions["song-editor"].Title}
          </Button>
          <Badge className="absolute -top-2 -right-2">
            {commonT().sentences["Coming-soon"]}
          </Badge>
        </div>
        <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
          <Settings /> {t().navigation.actions.settings.Title}
        </Button>
      </div>
      <SettingsDialog open={isSettingsOpen} setOpen={setIsSettingsOpen} />
    </>
  );
};
