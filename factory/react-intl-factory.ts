import { createIntl, createIntlCache } from 'react-intl';
import translationsEn from '../translations/en.json';
import translationsRu from '../translations/ru.json';

export type Translations = {
  en: Record<string, string>;
  ru: Record<string, string>;
};

export type SupportedLanguage = keyof Translations;

const defaultTranslations: Translations = {
  en: translationsEn,
  ru: translationsRu,
};

export class ReactIntlFactory {
  create(locale: SupportedLanguage, overrideTranslations?: Translations) {
    const cache = createIntlCache();

    const mergedTranslations: Translations = {
      en: {
        ...defaultTranslations.en,
        ...(overrideTranslations?.en ?? {}),
      },
      ru: {
        ...defaultTranslations.ru,
        ...(overrideTranslations?.ru ?? {}),
      },
    };

    return createIntl(
      {
        locale: locale,
        messages: mergedTranslations[locale],
        defaultLocale: 'en',
      },
      cache
    );
  }
}
