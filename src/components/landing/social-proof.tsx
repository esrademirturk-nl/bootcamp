import { getT } from 'next-i18next/server';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { siteStats } from '@/data/site-stats';

const labelKeys: Record<string, string> = {
  graduates: 'landing.stats.graduatesLabel',
  employmentRate: 'landing.stats.employmentRateLabel',
  partners: 'landing.stats.partnersLabel',
};

export async function SocialProof() {
  const { t } = await getT('common');

  const stats = siteStats.map((stat) => ({
    id: stat.id,
    targetValue: stat.targetValue,
    suffix: stat.suffix,
    label: t(labelKeys[stat.id]),
  }));

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center text-center">
            <span className="font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
              <AnimatedCounter value={stat.targetValue} suffix={stat.suffix} />
            </span>
            <span className="mt-1 text-sm text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
