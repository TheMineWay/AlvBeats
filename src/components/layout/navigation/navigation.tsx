import { ThemeSelector } from "@components/layout/navigation/actions/theme-selector";

export const Navigation: FC = () => {
  return (
    <div className="h-full flex items-center justify-end p-2 bg-background">
      <ThemeSelector />
    </div>
  );
};
