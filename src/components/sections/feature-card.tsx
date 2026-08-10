import { iconMap } from '@/lib/icon-map';
import type { Feature } from '@/types';

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.icon];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg">
      {/* Hover'da beliren üst vurgu çizgisi */}
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary-600 transition-transform duration-300 group-hover:scale-x-100" />

      {Icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
      )}

      <h3 className="font-heading text-lg font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
    </div>
  );
}
