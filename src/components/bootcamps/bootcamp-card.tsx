/**
 * @file src/components/bootcamps/bootcamp-card.tsx
 * @description Tekil Bootcamp Kartı Bileşeni.
 */

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Bootcamp } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import i18nConfig from '../../../i18n.config';

interface BootcampCardProps {
  bootcamp: Bootcamp;
  locale: string;
}

const getLevelBadgeVariant = (level: Bootcamp['level']) => {
  switch (level) {
    case 'beginner':
      return 'success' as const;
    case 'intermediate':
      return 'default' as const;
    case 'advanced':
      return 'error' as const;
    default:
      return 'neutral' as const;
  }
}

export const BootcampCard: React.FC<BootcampCardProps> = ({ bootcamp, locale = 'tr' }) => {
  const { t } = useTranslation('common');
  const badgeVariant = getLevelBadgeVariant(bootcamp.level);

  // Metni JSON'daki bootcampsData alanından çek, yoksa varsayılan Türkçe metni kullan
  const description = t(`bootcampsData.${bootcamp.slug}.shortDescription`, {
    defaultValue: bootcamp.shortDescription,
  });

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50">
      
      {/* Görsel ve Üst Rozetler */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <Image
          src={bootcamp.heroImage}
          alt={bootcamp.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {bootcamp.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="warning">
              ★ {t('bootcampsPage.featured', { defaultValue: 'Aanbevolen' })}
            </Badge>
          </div>
        )}

        {/* Seviye Rozeti */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant={badgeVariant}>
            {t(`levelOptions.${bootcamp.level}`, { defaultValue: bootcamp.level })}
          </Badge>
        </div>
      </div>

      {/* Başlık alanı */}
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

      <CardContent className="p-5 pt-0 flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-1">
          {bootcamp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] text-primary-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      {/* Alt bilgi ve CTA */}
      <CardFooter className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 p-5 pt-0">
        <div className="flex flex-col pt-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span>⏱ {bootcamp.durationWeeks} Hafta</span>
            <span>•</span>
            <span className="font-semibold text-foreground">★ {bootcamp.rating}</span>
          </div>
          <span className="mt-1 text-lg font-bold text-primary-600">€{bootcamp.priceEUR}</span>
        </div>

        <Link href={localizedHref(`/bootcamps/${bootcamp.slug}`, locale)} className="pt-3">
          <Button size="sm" className="font-medium">
            {t('bootcampsPage.inspect', { defaultValue: 'Bekijken' })}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
