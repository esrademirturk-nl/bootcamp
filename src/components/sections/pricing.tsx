import { getT } from 'next-i18next/server';
import { pricingPlans } from '@/data/pricing';
import { PricingSelector } from './pricing-selector';

interface PricingProps {
  locale: string;
}

export async function Pricing({ locale }: PricingProps) {
  const { t } = await getT('common', { lng: locale });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.pricing.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.pricing.title')}
          </h2>
        </div>

        <PricingSelector
          plans={pricingPlans}
          selectedLabel={t('landing.pricing.selected')}
          startLabel={t('landing.pricing.start')}
          contactLabel={t('landing.pricing.contact')}
          perMonthLabel={t('landing.pricing.perMonth')}
          perYearLabel={t('landing.pricing.perYear')}
        />
      </div>
    </section>
  );
}
