import { useTheme } from "@components/layout/navigation/actions/use-theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { THEMES } from "@constants/theme/themes.constant";
import { useTranslation } from "@i18n/use-translation";
import clsx from "clsx";

export const ThemeSelector: FC = () => {
  const { t } = useTranslation("layout");
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme?.theme ?? undefined}
      onValueChange={(v) => setTheme({ theme: v as (typeof THEMES)[number] })}
    >
      <SelectTrigger>
        <SelectValue placeholder={t().navigation.actions.theme.Placeholder} />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map((theme) => (
          <SelectItem
            value={theme}
            key={theme}
            className="flex items-center gap-2"
          >
            <span className={clsx(`bg-${theme}-200`, "h-4 w-4 rounded-xs")} />
            {t().navigation.actions.theme.options[theme].Label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
