import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PricingPlan } from '@/types';

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={plan.highlighted ? 'border-2 border-primary shadow-lg scale-105' : ''}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <p className="mt-4 text-3xl font-bold">
          {plan.priceEUR !== null ? `${plan.priceEUR}€` : 'Bize Ulaşın'}
          {plan.period && (
            <span className="text-sm font-normal text-muted">
              {' '}
              /{plan.period === 'month' ? 'ay' : 'yıl'}
            </span>
          )}
        </p>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {plan.features.map((feature) => (
            <li key={feature} className="text-sm text-muted">
              ✓ {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          {plan.priceEUR !== null ? 'Şimdi Başla' : 'İletişime Geç'}
        </Button>
      </CardFooter>
    </Card>
  );
}
