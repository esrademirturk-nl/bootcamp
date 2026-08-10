import Link from 'next/link';
import { getT } from 'next-i18next/server';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import i18nConfig from '../../../i18n.config';

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

export async function ClosingCTA() {
  const { t, i18n } = await getT('common');
  const locale = i18n.language;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 py-20 text-center text-white">
      {/* Dekoratif arka plan ışıkları */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-4">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          {t('landing.closingCta.title')}
        </h2>
        <p className="mt-4 text-lg text-primary-100">{t('landing.closingCta.subtitle')}</p>
        <Link
          href={localizedHref('/bootcamps', locale)}
          className={cn(
            buttonVariants({ variant: 'primary', size: 'lg' }),
            'mt-8 inline-flex bg-white text-primary-700 hover:bg-primary-50'
          )}
        >
          {t('landing.closingCta.button')}
        </Link>
      </div>
    </section>
  );
}
