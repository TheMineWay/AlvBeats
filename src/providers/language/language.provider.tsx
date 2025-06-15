import {
  LanguageContext,
  TranslationStore,
} from "@/providers/language/language.context";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import {
  AVAILABLE_LOCALES,
  getLocale,
  MASTER_LOCALE,
} from "@i18n/locales/locales";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

const DEFAULT_LANGUAGE = MASTER_LOCALE;
const LANGUAGE_SCHEMA = z.object({
  lang: z.enum(AVAILABLE_LOCALES).default(DEFAULT_LANGUAGE),
});

type Language = z.infer<typeof LANGUAGE_SCHEMA>;

const KEY = "lang";

type Props = {
  children: React.ReactNode;
};

export default function LanguageProvider({ children }: Readonly<Props>) {
  const { value: _language, connector } = useConnectorWatch<Language>(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    KEY,
    LANGUAGE_SCHEMA
  );
  const language = _language?.lang ?? DEFAULT_LANGUAGE;
  const [translations, setTranslations] = useState<TranslationStore>();

  const setLanguage = (lang: Language["lang"]) => {
    connector.set<Language>(KEY, { lang }, LANGUAGE_SCHEMA);
  };

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

  const contextValue = useMemo(
    () =>
      translations
        ? {
            language,
            setLanguage,
            translations,
          }
        : undefined,
    [language, setLanguage, translations]
  );

  if (!contextValue) return null;

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
