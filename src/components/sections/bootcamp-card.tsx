import Image from 'next/image';
import Link from 'next/link';
import type { ResolvedBootcamp } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import i18nConfig from '../../../i18n.config';

interface BootcampCardProps {
  bootcamp: ResolvedBootcamp;
  locale: string;
  levelLabels: Record<ResolvedBootcamp['level'], string>;
  durationLabel: string;
  detailsLabel: string;
}

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

function getLevelBadge(
  level: ResolvedBootcamp['level'],
  levelLabels: BootcampCardProps['levelLabels']
) {
  switch (level) {
    case 'beginner':
      return { label: levelLabels.beginner, variant: 'success' as const };
    case 'intermediate':
      return { label: levelLabels.intermediate, variant: 'default' as const };
    case 'advanced':
      return { label: levelLabels.advanced, variant: 'error' as const };
    default:
      return { label: level, variant: 'neutral' as const };
  }
}

export function BootcampCard({
  bootcamp,
  locale,
  levelLabels,
  durationLabel,
  detailsLabel,
}: BootcampCardProps) {
  const levelInfo = getLevelBadge(bootcamp.level, levelLabels);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-surface-muted">
        <Image
          src={bootcamp.heroImage}
          alt={bootcamp.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 z-10">
          <Badge variant={levelInfo.variant}>{levelInfo.label}</Badge>
        </div>
      </div>

      <CardHeader className="space-y-2 p-5 pb-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="font-semibold uppercase tracking-wider text-primary-600">
            {bootcamp.categorySlug}
          </span>
          <span className="rounded bg-surface-muted px-2 py-0.5 capitalize">{bootcamp.format}</span>
        </div>
        <h3 className="font-heading text-lg font-bold leading-tight text-foreground line-clamp-2 transition-colors group-hover:text-primary-600">
          {bootcamp.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 p-5 pt-0">
        <p className="line-clamp-2 text-sm text-muted">{bootcamp.shortDescription}</p>
        <div className="flex flex-wrap gap-1">
          {bootcamp.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] text-primary-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 p-5 pt-0">
        <div className="flex flex-col pt-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span>⏱ {durationLabel}</span>
            <span>•</span>
            <span className="font-semibold text-foreground">★ {bootcamp.rating}</span>
          </div>
          <span className="mt-1 text-lg font-bold text-primary-600">€{bootcamp.priceEUR}</span>
        </div>

        <Link href={localizedHref(`/bootcamps/${bootcamp.slug}`, locale)} className="pt-3">
          <Button size="sm" className="font-medium">
            {detailsLabel}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
