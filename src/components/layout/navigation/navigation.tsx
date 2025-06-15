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
import { useTranslation } from "@i18n/use-translation";
import { Link } from "@tanstack/react-router";
import { Home, Menu } from "lucide-react";

export const Navigation: FC = () => {
  const { t: commonT } = useTranslation("common");
  const { t } = useTranslation("layout");

  return (
    <div className="h-full flex items-center justify-between p-2 bg-background/70 backdrop-blur-md">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Menu />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="relative inline-block">
                <Button variant="outline" disabled>
                  {t().navigation.actions["song-editor"].Title}
                </Button>
                <Badge className="absolute -top-2 -right-2">
                  {commonT().sentences["Coming-soon"]}
                </Badge>
              </div>
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
