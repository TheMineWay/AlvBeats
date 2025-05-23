import {
  LANGUAGE_CONTEXT,
  TranslationStore,
} from "@/providers/language/language.context";
import { Language } from "@i18n/language.enum";
import { getLocale, MASTER_LOCALE } from "@i18n/locales/locales";
import _ from "lodash";
import { useEffect, useState } from "react";

const DEFAULT_LANGUAGE = Language.ES_ES;

type Props = {
  children: React.ReactNode;
};

export default function LanguageProvider({ children }: Readonly<Props>) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<TranslationStore>();

  useEffect(() => {
    const updateLoadedLocale = async () => {
      setTranslations(
        _.defaultsDeep(
          {},
          {
            ...(await getLocale(language)).default,
          },
          {
            ...(await getLocale(MASTER_LOCALE)).default,
          }
        )
      );
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
