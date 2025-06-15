import { useLanguageContext } from "@/providers/language/language.context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@components/ui/select";
import { AVAILABLE_LOCALES } from "@i18n/locales/locales";
import { useTranslation } from "@i18n/use-translation";

export const LanguageSelector: FC = () => {
  const { setLanguage, language } = useLanguageContext();
  const { t } = useTranslation("common");

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-28">
        <p>{t().languages[language].Name}</p>
      </SelectTrigger>
      <SelectContent>
        {AVAILABLE_LOCALES.map((locale) => (
          <SelectItem
            key={locale}
            value={locale}
            onSelect={() => setLanguage(locale)}
            className="flex items-center gap-2"
          >
            {t().languages[locale].Name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
