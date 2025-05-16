import { useTranslation } from "@i18n/use-translation";

export const Header: FC = () => {
  const { t } = useTranslation("layout");
  return (
    <div
      className={
        "bg-primary h-38 md:h-64 w-full text-secondary flex items-center justify-center text-2xl md:text-4xl font-bold text-center"
      }
    >
      <h1>{t().welcome.Message}</h1>
    </div>
  );
};
