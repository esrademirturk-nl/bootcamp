import Image from 'next/image';
import Link from 'next/link';
import { getT } from 'next-i18next/server';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import i18nConfig from '../../../i18n.config';

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

interface HeroProps {
  locale: string;
}

export async function Hero({ locale }: HeroProps) {
  const { t } = await getT('common', { lng: locale });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950/70 to-primary-950/90" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          {t('landing.hero.title')}
        </h1>
        <p className="max-w-2xl text-lg text-neutral-100 sm:text-xl">
          {t('landing.hero.subtitle')}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={localizedHref('/bootcamps', locale)}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
          >
            {t('landing.hero.ctaPrimary')}
          </Link>
          <Link
            href="#how-it-works"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'text-white hover:bg-white/10'
            )}
          >
            {t('landing.hero.ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
