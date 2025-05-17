import { useTheme } from "@components/layout/navigation/actions/use-theme";
import { Switch } from "@components/ui/switch";

export const DarkModeSwitch: FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Switch
      checked={theme?.dark}
      onCheckedChange={(dark) => setTheme({ dark })}
    />
  );
};
