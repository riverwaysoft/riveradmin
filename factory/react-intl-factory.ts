import { createIntl, createIntlCache } from 'react-intl';
import translationsEn from '../translations/en.json';
import translationsRu from '../translations/ru.json';

const riveradminMessages = {
  en: translationsEn,
  ru: translationsRu,
};

export type SupportedLanguage = keyof typeof riveradminMessages;

export class ReactIntlFactory {
  create(locale: SupportedLanguage) {
    const cache = createIntlCache();

    return createIntl(
      {
        locale: locale,
        messages: riveradminMessages[locale],
        defaultLocale: 'en',
      },
      cache
    );
  }
}
