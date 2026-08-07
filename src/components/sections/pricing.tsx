import { pricingPlans } from '@/data/pricing';
import { PricingCard } from './pricing-card';

export function Pricing() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Fiyatlandırma</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
