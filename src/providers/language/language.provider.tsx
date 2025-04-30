import {
  LANGUAGE_CONTEXT,
  TranslationStore,
} from "@/providers/language/language.context";
import { Language } from "@i18n/language.enum";
import { getLocale } from "@i18n/locales/locales";
import { useEffect, useState } from "react";

const DEFAULT_LANGUAGE = Language.EN_US;

type Props = {
  children: React.ReactNode;
};

export default function LanguageProvider({ children }: Readonly<Props>) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<TranslationStore>();

  useEffect(() => {
    const updateLoadedLocale = async () => {
      setTranslations({
        ...(await getLocale(language)).default,
      });
    };

    updateLoadedLocale();
  }, [language]);

  if (!translations) return null;

  return (
    <LANGUAGE_CONTEXT.Provider
      value={{
        language,
        setLanguage,
        translations,
      }}
    >
      {children}
    </LANGUAGE_CONTEXT.Provider>
  );
}
