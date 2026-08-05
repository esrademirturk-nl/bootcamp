'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { Select } from '@/components/ui/select';
import i18nConfig from '../../../i18n.config';

const languageNames: Record<string, string> = {
  tr: '🇹🇷 Türkçe',
  en: '🇬🇧 English',
  nl: '🇳🇱 Nederlands',
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { i18n, t } = useT('common');
  const { supportedLngs, fallbackLng } = i18nConfig;
  const currentLng = i18n.language;

  function switchLocale(locale: string) {
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = supportedLngs.includes(segments[0]) ? segments.slice(1) : segments;
    const nextPath =
      locale === fallbackLng
        ? `/${pathWithoutLocale.join('/')}`
        : `/${locale}/${pathWithoutLocale.join('/')}`;

    router.push(nextPath === '/' ? '/' : nextPath.replace(/\/$/, ''));
  }

  return (
    <Select
      value={currentLng}
      onChange={(event) => switchLocale(event.target.value)}
      aria-label={t('header.languageSelect')}
      className="h-8 w-auto py-1 pr-8 text-sm"
    >
      {supportedLngs.map((lng) => (
        <option key={lng} value={lng}>
          {languageNames[lng] ?? lng.toUpperCase()}
        </option>
      ))}
    </Select>
  );
}
