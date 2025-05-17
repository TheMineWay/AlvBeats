import { useTheme } from "@components/layout/navigation/actions/use-theme";
import { Switch } from "@components/ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";

const ICON_SIZE = "1.25rem";

export const DarkModeSwitch: FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {theme?.dark ? (
        <MoonIcon size={ICON_SIZE} />
      ) : (
        <SunIcon size={ICON_SIZE} />
      )}
      <Switch
        checked={theme?.dark}
        onCheckedChange={(dark) => setTheme({ dark })}
      />
    </div>
  );
};
