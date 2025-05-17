import { DarkModeSwitch } from "@components/layout/navigation/actions/dark-mode-switch";
import { ThemeSelector } from "@components/layout/navigation/actions/theme-selector";

export const Navigation: FC = () => {
  return (
    <div className="h-full flex items-center justify-end p-2 bg-background/70 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <ThemeSelector />
      </div>
    </div>
  );
};
