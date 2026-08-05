import type { I18nConfig } from 'next-i18next/proxy';

const i18nConfig: I18nConfig = {
  supportedLngs: ['tr', 'en', 'nl'],
  fallbackLng: 'tr',
  defaultNS: 'common',
  ns: ['common'],
  hideDefaultLocale: true,
};

export default i18nConfig;
