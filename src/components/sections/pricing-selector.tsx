'use client';

import * as React from 'react';
import { PricingCard } from './pricing-card';
import type { PricingPlan } from '@/types';

interface PricingSelectorProps {
  plans: PricingPlan[];
  selectedLabel: string;
  startLabel: string;
  contactLabel: string;
  perMonthLabel: string;
  perYearLabel: string;
}

export function PricingSelector({
  plans,
  selectedLabel,
  startLabel,
  contactLabel,
  perMonthLabel,
  perYearLabel,
}: PricingSelectorProps) {
  // Başlangıçta mock data'daki highlighted:true olan plan seçili gelir,
  // yoksa ilk plan varsayılan olur.
  const defaultSelectedId = plans.find((plan) => plan.highlighted)?.id ?? plans[0]?.id;
  const [selectedId, setSelectedId] = React.useState(defaultSelectedId);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedId}
          onSelect={() => setSelectedId(plan.id)}
          selectedLabel={selectedLabel}
          startLabel={startLabel}
          contactLabel={contactLabel}
          perMonthLabel={perMonthLabel}
          perYearLabel={perYearLabel}
        />
      ))}
    </div>
  );
}
