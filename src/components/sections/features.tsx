import { features } from '@/data/features';
import { FeatureCard } from './feature-card';
import { getT } from 'next-i18next/server';

export async function Features() {
  const { t } = await getT('common');
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.features.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.features.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
