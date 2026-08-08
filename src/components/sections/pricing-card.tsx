import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { PricingPlan } from '@/types';

interface PricingCardProps {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: () => void;
  selectedLabel: string;
  startLabel: string;
  contactLabel: string;
  perMonthLabel: string;
  perYearLabel: string;
}

export function PricingCard({
  plan,
  isSelected,
  onSelect,
  selectedLabel,
  startLabel,
  contactLabel,
  perMonthLabel,
  perYearLabel,
}: PricingCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`relative flex h-full cursor-pointer flex-col transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
        isSelected
          ? 'border-2 border-primary-600 shadow-lg lg:scale-105'
          : 'border-border/60 hover:border-primary-200 hover:shadow-md'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary-600 text-white">{selectedLabel}</Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="font-heading">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <p className="mt-4">
          <span className="font-heading text-3xl font-bold text-foreground">
            {plan.priceEUR !== null ? `${plan.priceEUR}€` : contactLabel}
          </span>
          {plan.period && (
            <span className="text-sm font-normal text-muted">
              {' '}
              /{plan.period === 'month' ? perMonthLabel : perYearLabel}
            </span>
          )}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="flex flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          variant={isSelected ? 'primary' : 'secondary'}
          className="w-full"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
        >
          {plan.priceEUR !== null ? startLabel : contactLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
