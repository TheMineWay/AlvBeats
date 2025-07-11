import { Language } from "@i18n/language.enum";
import { LocaleKey } from "@i18n/locales/locales";
import { createContext, useContext } from "react";

export type TranslationStore = Partial<Record<LocaleKey, object>>;

interface LanguageContext {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: TranslationStore;
}

export const LanguageContext = createContext<LanguageContext>(null!);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context)
    throw new Error(
      "Tried to use useLanguageContext outside the LanguageProvider"
    );

  return context;
};
