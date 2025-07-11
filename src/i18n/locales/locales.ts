import { Language } from "@i18n/language.enum.ts";

export const MASTER_LOCALE = Language.EN_US;
export const AVAILABLE_LOCALES = [
  Language.EN_US,
  Language.ES_ES,
  Language.CA_ES,
  Language.SV_SE,
] as const;

const LOCALES = {
  [Language.EN_US]: () => import("./en-us/locale.ts"),
  [Language.ES_ES]: () => import("./es-es/locale.ts"),
  [Language.CA_ES]: () => import("./ca-es/locale.ts"),
  [Language.SV_SE]: () => import("./sv-se/locale.ts"),
} as const satisfies Record<string, () => Promise<object>>;

export const getLocale = async (language: Language) => {
  return await LOCALES[language]();
};

// Locales type

export type LocaleKey = keyof Awaited<
  ReturnType<(typeof LOCALES)[Language]>
>["default"];

export type LocaleContent<K extends LocaleKey> = Awaited<
  Awaited<ReturnType<(typeof LOCALES)[typeof MASTER_LOCALE]>>["default"][K]
>;
