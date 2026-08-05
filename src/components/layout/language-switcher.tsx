'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import i18nConfig from '../../../i18n.config';

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
    <div className="flex items-center gap-1">
      {supportedLngs.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => switchLocale(lng)}
          aria-label={t('header.languageSelect')}
          aria-current={currentLng === lng}
          className={`rounded-md px-2 py-1 text-sm font-medium uppercase hover:bg-surface-muted ${
            currentLng === lng ? 'text-primary-600' : 'text-muted'
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
