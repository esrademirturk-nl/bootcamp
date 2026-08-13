import { getT } from 'next-i18next/server';
import { mockBootcamps } from '@/data/bootcamps';
import { resolveBootcamp } from '@/lib/resolve-mock-data';
import { BootcampCard } from './bootcamp-card';

interface FeaturedProgramsProps {
  locale: string;
}

export async function FeaturedPrograms({ locale }: FeaturedProgramsProps) {
  const { t } = await getT('common', { lng: locale });
  const featured = mockBootcamps
    .filter((bootcamp) => bootcamp.featured)
    .slice(0, 3)
    .map((bootcamp) => resolveBootcamp(bootcamp, t));

  const levelLabels = {
    beginner: t('levelOptions.beginner', { defaultValue: 'Başlangıç' }),
    intermediate: t('levelOptions.intermediate', { defaultValue: 'Orta Seviye' }),
    advanced: t('levelOptions.advanced', { defaultValue: 'İleri Seviye' }),
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.featuredPrograms.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.featuredPrograms.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((bootcamp) => (
            <BootcampCard
              key={bootcamp.slug}
              bootcamp={bootcamp}
              locale={locale}
              levelLabels={levelLabels}
              durationLabel={t('bootcampsPage.weeks', {
                count: bootcamp.durationWeeks,
                defaultValue: `${bootcamp.durationWeeks} Hafta`,
              })}
              detailsLabel={t('landing.featuredPrograms.viewDetails')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
