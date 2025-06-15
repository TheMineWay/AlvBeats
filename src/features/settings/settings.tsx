import { useTranslation } from "@i18n/use-translation";

const SECTION_TITLE_CLASS = "text-lg font-semibold";
const SECTION_CONTAINER_CLASS = "flex flex-col gap-2";

export const Settings: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Theme />
    </div>
  );
};

const Theme: FC = () => {
  const { t } = useTranslation("settings");

  return (
    <div className={SECTION_CONTAINER_CLASS}>
      <h2 className={SECTION_TITLE_CLASS}>{t().sections.theme.Title}</h2>
    </div>
  );
};
