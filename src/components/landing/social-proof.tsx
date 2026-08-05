import { getT } from 'next-i18next/server';

export async function SocialProof() {
  const { t } = await getT('common');

  const stats = [
    { value: t('landing.stats.graduates'), label: t('landing.stats.graduatesLabel') },
    {
      value: t('landing.stats.employmentRate'),
      label: t('landing.stats.employmentRateLabel'),
    },
    { value: t('landing.stats.partners'), label: t('landing.stats.partnersLabel') },
  ];

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
              {stat.value}
            </span>
            <span className="mt-1 text-sm text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
