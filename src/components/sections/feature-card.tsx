import { Card, CardContent } from '@/components/ui/card';
import { iconMap } from '@/lib/icon-map';
import type { Feature } from '@/types';

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon];

  return (
    <Card className="p-6">
      <CardContent className="flex flex-col gap-3 p-0">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <h3 className="font-semibold">{feature.title}</h3>
        <p className="text-sm text-muted">{feature.description}</p>
      </CardContent>
    </Card>
  );
}
